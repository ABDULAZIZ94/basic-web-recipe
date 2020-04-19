
$( document ).ready(function() {

    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("table_element").innerHTML = this.responseText;
        }
    };
    xmlhttp2.open("GET", "select_table.php" , true);
    xmlhttp2.send();
    
});