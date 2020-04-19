<?php
    //this file about network configuration
    
    //db credentials assume default setting
    define ('DB_SERVER', 'localhost');
    define ('DB_USERNAME', 'root');
    define ('DB_PASSWORD', '');
    define ('DB_NAME', 'mysql');

    //attemp to connect database
    $link = mysqli_connect(DB_SERVER, DB_USERNAME,
     DB_PASSWORD, DB_NAME);

     //check connection 
     if($link === false){
         die("ERROR: Could not connect. ".
          mysqli_connect_error());
     }
?>