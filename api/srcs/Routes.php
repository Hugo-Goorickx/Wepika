<?php

$dotenv = \Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$controller = new App\Controller\Controller($_ENV['DB_HOST'], $_ENV['DB_NAME'], $_ENV['DB_USER'], $_ENV['DB_PWD']);
try                     { $controller->connectDB(); }
catch (\Exception $e)   { echo "Erreur : " . $e->getMessage(); }

$router = new \Bramus\Router\Router();

$router->set404(function() {
	header('HTTP/1.1 404 Not Found');
	echo '404, route not found!';
});
/*
1 Brabant Wallon
2 Brabant Flamand
3 Hainaut
4 Liège
5 Luxembourg
6 Namur
7 Anvers
8 FlanFlandre Occidentale
9 Flandre Orientale
10 Limbourg
11 Region Bruxelles-Capitale
*/
// Static route: / (homepage)
$router->get('/all/(\d+)/(\d+)(/[a-z0-9_-]+)?', function($start = 0, $size = 0, $province = "") use ($controller) {
    $provinces = [[100,3999],
                [100,1299],
                [1300,1499],
                [1500,1999],
                [6000,6599],
                [4000,4999],
                [6600,6999],
                [5000,5999],
                [2000,2999],
                [8000,8999],
                [9000,9999],
                [3500,3999]];
    $provinceNames = array();
    if ($province != "") {
        $provinceNumbers = explode("-", $province);

        foreach ($provinceNumbers as $provinceNumber) {
            if (isset($provinces[$provinceNumber])) {
                $provinceNames[] = $provinces[$provinceNumber];
            }
        }
    }
    
	$sqlQuery = 'SELECT ecommerce.ID,
                        ecommerce.Name,
                        ecommerce.URL,
                        ecommerce.Logo,
                        ecommerce.Description,
                        ecommerce.Image_vitrine,
                    (SELECT GROUP_CONCAT(DISTINCT categories.Name ORDER BY categories.ID SEPARATOR \', \')
                        FROM categories
                        INNER JOIN link_cat ON categories.ID = link_cat.flag_id
                        WHERE link_cat.website_id = ecommerce.ID
                        AND link_cat.status = 0
                        LIMIT 1) AS Categories
                FROM ecommerce
                -- INNER JOIN shop_details ON ecommerce.ID = shop_details.website_ID
                WHERE ecommerce.ID >= '.($start ? $start:0);
    // if ($province != "") {
    //     $sqlQuery .= ' AND (';
    //     foreach ($provinceNames as $provinceName) {
    //         $sqlQuery .= '(shop_details.cp BETWEEN '.$provinceName[0].' AND '.$provinceName[1].') OR ';
    //     }
    //     $sqlQuery = substr($sqlQuery, 0, -4);
    //     $sqlQuery .= ')';
    // }
    $sqlQuery .= ' LIMIT '.($size ? $size : 20 ).';';
    echo $controller->executeRequest($sqlQuery);
});

$router->get('/id/{id_website}(/\d+)?', function($id_website, $id_details = null) use ($controller) {

    $originalDomain = str_replace('-', '.', $id_website);
	$globalRequest = '  SELECT ecommerce.ID, ecommerce.Name, ecommerce.URL, ecommerce.Logo, ecommerce.Image_vitrine, ecommerce.Description
                        FROM ecommerce
                        WHERE ecommerce.Name = "'.$originalDomain.'";';

    $globalDatas = $controller->executeRequest($globalRequest);
    $globalDatas = json_decode($globalDatas, true);
    $id_website = $globalDatas[0]['ID'];
    $flagRequest = '    SELECT categories.Name AS flag_name
                        FROM categories
                        JOIN link_cat ON categories.ID = link_cat.flag_id
                        WHERE link_cat.website_id = '.$id_website.';';

    $attRequest = '     SELECT attributs.Name AS attribute_name
                        FROM attributs
                        JOIN link_att link_att ON attributs.ID = link_att.att_id
                        WHERE link_att.website_id = '.$id_website.';';

    $detailsRequest = ' SELECT * 
                        FROM shop_details'
                        .(($id_details)?' WHERE Id = '.$id_details.';':' WHERE website_id = '.$id_website.';');

    $networkDatas = '   SELECT type, data 
                        FROM social_network
                        WHERE website_id = '.$id_website.';';
    echo json_encode([
        'globalDatas'=> $controller->executeRequest($globalRequest),
        'attDatas'=> $controller->executeRequest($attRequest),
        'flagDatas'=> $controller->executeRequest($flagRequest),
        'shopDatas'=> $controller->executeRequest($detailsRequest),
        'networkDatas'=> $controller->executeRequest($networkDatas),
    ]);
});

// Thunderbirds are go!
$router->run();