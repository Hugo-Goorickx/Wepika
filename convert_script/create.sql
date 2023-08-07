-- Création de la table ecommerce
CREATE TABLE ecommerce (
  ID INT PRIMARY KEY,
  Name VARCHAR(255),
  URL VARCHAR(255),
  Description VARCHAR(255),
  Logo VARCHAR(255),
  Image_vitrine VARCHAR(255),
  Status INT,
  ID_Ekommerce INT
);

-- Création de la table categories
CREATE TABLE categories (
  ID INT PRIMARY KEY,
  Name VARCHAR(255)
);

-- Création de la table attributs
CREATE TABLE attributs (
  ID INT PRIMARY KEY,
  Name VARCHAR(255)
);

-- Création de la table social_network
CREATE TABLE social_network (
  ID INT PRIMARY KEY,
  website_id INT,
  Type INT,
  Data VARCHAR(255),
  FOREIGN KEY (website_id) REFERENCES ecommerce(ID)
);

-- Création de la table shop_details
CREATE TABLE shop_details (
  ID INT PRIMARY KEY,
  website_ID INT,
  address VARCHAR(255),
  cp INT,
  city VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  status INT,
  FOREIGN KEY (website_ID) REFERENCES ecommerce(ID)
);

-- Création de la table link_cat
CREATE TABLE link_cat (
  flag_id INT,
  website_id INT,
  status INT,
  FOREIGN KEY (flag_id) REFERENCES categories(ID),
  FOREIGN KEY (website_id) REFERENCES ecommerce(ID)
);

-- Création de la table link_att
CREATE TABLE link_att (
  att_id INT,
  website_id INT,
  FOREIGN KEY (att_id) REFERENCES attributs(ID),
  FOREIGN KEY (website_id) REFERENCES ecommerce(ID)
);