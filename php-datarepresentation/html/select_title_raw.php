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

/**
* Get the column names for a mysql table
**/

function get_column_names($con, $table) {
  $sql = 'DESCRIBE '.$table;
  $result = mysqli_query($con, $sql);

  $rows = array();

  while($row = mysqli_fetch_assoc($result)) {
   echo $row['Field'];
  //array_push($row, $row['Field']);
    if( $row['Field']!="\r\n")
      echo ",";
  }

 
 /*  echo $row[0];

  for($i=0; $i< 10; $i++){
    echo $row[$i];
  } */
  
}

get_column_names($conn, $table);

$conn->close();
?>
