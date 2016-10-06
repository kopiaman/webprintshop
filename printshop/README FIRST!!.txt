This is printshop using printpixel library

FOLDER DESCRIPTION----------------------------------
 -ADMIN is the original backend using SLIM framework. Can access ie. localhost/webprintshop/admin. Need username and password
 -VENDOR is the dependencies for SLIM framework
 -API is the api logic for angular frontend but using php
 -DATA is collections data of clipart,products,payment_method. Note, there is no need to setup database because it's use sqlite
 -DIST is the upload version of printshop ( consider as compiled version). Do not change anything from here. Do it on SRC!
 -SRC is the source of precompile LESS and VIEW, You to need to run gulp inside to compile it into DIST
 -STORAGE is where the images of products' order and upload is stored

FILE DESCRIPTION--------------------------------------------

-index.php will redirect to dist 
-config.php for base url and database setting. Default use sqlite3. I dont test the MYSQL yet
-bootstrap.php is the database schema builder and SMTP config for mailer
-composer.json is php dependencies which will downloaded in VENDOR folder. If need to add new vendor just run composer require <anyVendor>





 
 