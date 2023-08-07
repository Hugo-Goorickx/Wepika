<?php
$globalStatus = 0;

//In first extract name, url, desc, logo and all social links from ekommerce_db1
$sqlRequest = " SELECT
                    w.id                    AS website_id,
                    w.domain                AS website_name,
                    w.final_url             AS website_url,
                    MAX(d_logo.value)       AS website_logo,
                    MAX(d_desc.value)       AS website_description,
                    MAX(tiktok.value)       AS tiktok_data,
                    MAX(facebook.value)     AS facebook_data,
                    MAX(instagram.value)    AS instagram_data,
                    MAX(pinterest.value)    AS pinterest_data,
                    MAX(twitter.value)      AS twitter_data,
                    MAX(linkedin.value)     AS linkedin_data
                FROM
                    websites w
                LEFT JOIN data d_logo     ON w.id = d_logo.website_id     AND d_logo.field_id     = (SELECT id FROM fields WHERE name = 'logo')
                LEFT JOIN data d_desc     ON w.id = d_desc.website_id     AND d_desc.field_id     = (SELECT id FROM fields WHERE name = 'description')
                LEFT JOIN data tiktok     ON w.id = tiktok.website_id     AND tiktok.field_id     = (SELECT id FROM fields WHERE name = 'tiktok')
                LEFT JOIN data facebook   ON w.id = facebook.website_id   AND facebook.field_id   = (SELECT id FROM fields WHERE name = 'facebook')
                LEFT JOIN data instagram  ON w.id = instagram.website_id  AND instagram.field_id  = (SELECT id FROM fields WHERE name = 'instagram')
                LEFT JOIN data pinterest  ON w.id = pinterest.website_id  AND pinterest.field_id  = (SELECT id FROM fields WHERE name = 'pinterest')
                LEFT JOIN data twitter    ON w.id = twitter.website_id    AND twitter.field_id    = (SELECT id FROM fields WHERE name = 'twitter')
                LEFT JOIN data linkedin   ON w.id = linkedin.website_id   AND linkedin.field_id   = (SELECT id FROM fields WHERE name = 'linkedin')
                WHERE 
                    w.percent_belgian > 30 
                    AND w.percent_ecommerce >= 30
                GROUP BY
                    w.id, w.domain, w.final_url;";

//DB connection
//Ekommerce crawler
$pdo_output = new PDO("mysql:host=localhost;dbname=ekommerce_db1", 'root', '');
$pdo_output->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

//Ekommerce website
$pdo_input = new PDO("mysql:host=localhost;dbname=ekommerce_db2", 'root', '');
$pdo_input->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);

//Get all websites
try
{
    $recipesStatement = $pdo_output->prepare($sqlRequest);
    $recipesStatement->execute();
    $recipes = $recipesStatement->fetchAll();
}
catch (\Throwable $th)
{
    $globalStatus = 1;
    echo $th . " - Request from db crawler\n";
}

$sqlRequestOutAll = '';
//Loop on all websites
foreach ($recipes as $row)
{
    //Extract data
    $ID             = $row['website_id'];
    $Name           = $row['website_name'];
    $URL            = $row['website_url'];
    $Description    = $row['website_description'];
    $Logo           = $row['website_logo'];
    $tiktok         = $row['tiktok_data'];
    $facebook       = $row['facebook_data'];
    $instagram      = $row['instagram_data'];
    $pinterest      = $row['pinterest_data'];
    $twitter        = $row['twitter_data'];
    $linkedin       = $row['linkedin_data'];
    
    //search if the website is already in the database to update it
    try
    {
        $recipesStatementIn = $pdo_input->prepare("SELECT id,status FROM ecommerce WHERE ID_Ekommerce = '".$ID."';");
        $recipesStatementIn->execute();
        $recipesIn = $recipesStatementIn->fetchAll();
    }
    catch (\Throwable $th)
    {
        $globalStatus = 1;
        echo $th." - Request from db crawler with the website_id = ".$ID."\n";
    }

    //if yes, update it
    if ($recipesIn != null)
    {
        //Check if status is ok
        if (!$recipesIn[0]['status'])
        {
            $ID = $recipesIn[0]['id'];
            $sqlRequestOutAll   .=  "UPDATE ecommerce SET Name = '".$Name."', URL = '".$URL."', Description = '".$Description."', Logo = '".$Logo."', Status = 0 WHERE ID = '".$ID."';\n".
                                    (($tiktok != null)       ? "UPDATE social_network SET Data = '".$tiktok."' WHERE website_id = ".$ID." AND Type = 1;"    :"").
                                    (($facebook != null)     ? "UPDATE social_network SET Data = '".$facebook."' WHERE website_id = ".$ID." AND Type = 2;"  :"").
                                    (($instagram != null)    ? "UPDATE social_network SET Data = '".$instagram."' WHERE website_id = ".$ID." AND Type = 3;" :"").
                                    (($pinterest != null)    ? "UPDATE social_network SET Data = '".$pinterest."' WHERE website_id = ".$ID." AND Type = 4;" :"").
                                    (($twitter != null)      ? "UPDATE social_network SET Data = '".$twitter."' WHERE website_id = ".$ID." AND Type = 5;"   :"").
                                    (($linkedin != null)     ? "UPDATE social_network SET Data = '".$linkedin."' WHERE website_id = ".$ID." AND Type = 6;"  :"");
        }
    }
    //if not, insert it
    else
    {
        $sqlRequestOutAll   .=  "INSERT INTO ecommerce (Name, URL, Description, Logo, Status, ID_Ekommerce) VALUES ('".$Name."', '".$URL."', '".$Description."', '".$Logo."', 0, '".$ID."');\n".
                                "SET @ecommerce_id := LAST_INSERT_ID();".
                                (($tiktok != null)       ? "INSERT INTO social_network (website_id, Type, Data) VALUES (@ecommerce_id, 1, '".$tiktok."');"    :"").
                                (($facebook != null)     ? "INSERT INTO social_network (website_id, Type, Data) VALUES (@ecommerce_id, 2, '".$facebook."');"  :"").
                                (($instagram != null)    ? "INSERT INTO social_network (website_id, Type, Data) VALUES (@ecommerce_id, 3, '".$instagram."');" :"").
                                (($pinterest != null)    ? "INSERT INTO social_network (website_id, Type, Data) VALUES (@ecommerce_id, 4, '".$pinterest."');" :"").
                                (($twitter != null)      ? "INSERT INTO social_network (website_id, Type, Data) VALUES (@ecommerce_id, 5, '".$twitter."');"   :"").
                                (($linkedin != null)     ? "INSERT INTO social_network (website_id, Type, Data) VALUES (@ecommerce_id, 6, '".$linkedin."');"  :"");
    }
}

//Execute the request to add/update all websites
try
{
    $recipesStatement = $pdo_input->prepare($sqlRequestOutAll);
    $recipesStatement->execute();
    $recipes = $recipesStatement->fetchAll();
}
catch (\Throwable $th)
{
    $globalStatus = 1;
    echo $th . " - Request to db ruisseaux\n";
}

if (!$globalStatus)
    echo "The convert worked well\n";
/*
tiktok = 1
facebook = 2
instagram = 3
pinterest = 4
twitter = 5
linkedin = 6
*/
?>