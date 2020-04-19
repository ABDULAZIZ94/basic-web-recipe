<?php
        require_once "../php/connection.php";

        $db = "ecocrop";
    
        mysqli_select_db($conn,$db);

    $handle = fopen("./ecocrop.csv", "r");
    // Read first (headers) record only)
    $data = fgetcsv($handle, 1000, ",");
    $sql= 'CREATE TABLE ecocrop (';
    for($i=0;$i<count($data); $i++) {
        $column_name_raw = $data[$i];
        $column_name = str_replace(" ", "_", $column_name_raw);
        $sql .=  strtolower($column_name) .' VARCHAR(50), ';
    }
    $sql .= ')';

    echo $sql;

    fclose($handle);
?> 