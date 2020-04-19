<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ecocrop";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        
        die("Connection failed: " . $conn->connect_error);

    } 

    $table = 'ecocrop';

    //get table head

    function get_column_names($con, $table) {

        $sql = 'DESCRIBE '.$table;
        $result = mysqli_query($con, $sql);
        $rows = array();
        $c = 0;

        echo "<thead>";
        echo "<tr>";
    
        while($row = mysqli_fetch_assoc($result)) {

            echo "<th>";
            // echo $c . ":" ;
            echo $row['Field'];
            //array_push($row, $row['Field']);
            echo "</th>";

            $c ++;

        }
    
        echo "</tr>";
        echo "</thead>";
        
    }
    
    get_column_names($conn, $table);


    //get table body
    $sql = "SELECT * FROM ecocrop";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        while( $row = $result->fetch_array(MYSQLI_NUM)) {
            
            echo "<tbody>";
            echo "<tr>";
            
            for($i=0; $i< sizeof($row); $i++){
                echo "<td>" . $row[$i] . "</td>";
            }
            
            echo "</tr>";
            echo "</tbody>";

        }

    } else {

        echo "0 results";

    }

    $conn->close();
    
?>
