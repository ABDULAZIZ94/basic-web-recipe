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

$sql = "SELECT * FROM ecocrop";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
   
    while( $row = $result->fetch_array(MYSQLI_NUM)) {
        
        for($i=0; $i< sizeof($row); $i++){
            echo  $row[$i];
            if($i+1 != sizeof($row))
                echo  ",";
        }
            echo '\\n';
    }
   

} else {
    echo "0 results";
}
$conn->close();
?>
