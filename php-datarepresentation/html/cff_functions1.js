//raw data from php
var tittles = [];
var datas = [] ;

//data from user interface
var selected;
var selected_indx =1;

var datas_in_array = [];

//after data filtering and chage form
var occurenace = [];
var unique_occurenace = [];
var unique

$( document ).ready(function() {


    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
    
        if (this.readyState == 4 && this.status == 200) {

            var res_string = this.responseText;
            tittles =  res_string.split(",");;
            
            //console.log(tittles);
            setOptions();
        }

    };

    xmlhttp.open("GET", "select_title_raw.php" , true);
    xmlhttp.send();

    var xmlhttp2 = new XMLHttpRequest();

    xmlhttp2.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
           
            var res_string = this.responseText;
            datas =  res_string.split('\\n');
            
            //console.log(datas);
            //console.log(JSON.parse("[[1,2],[1,2],[1,2]]"));

            

            for(var i=0; i < datas.length; i++){
    
                datas_in_array[i] = datas[i].split(",");

            }

            //console.log(datas_in_array);
            //findCum();
        }
    };

    xmlhttp2.open("GET", "select_raw.php" , true);
    xmlhttp2.send();


    function setOptions(){

        var options="";

        for(var i=0; i<tittles.length; i++){
        
            options += "<option>" + tittles[i] + "</option>";

        }
    
        document.getElementById("title_select").innerHTML = options;
        document.getElementById("title_select").onchange = function(){
            clearCache();


            selected_indx = this.selectedIndex;
            selected = this.children[selected_indx].innerHTML.trim();
            console.log(selected);
            drawPie();
            //findRow();
            findCum();

        };

    }

    function drawPie(){

        google.charts.load("current", {packages:["corechart"]});

        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = new google.visualization.DataTable();

            data.addColumn("string","Type");
            data.addColumn("number","Occurance");
            
            for(var i=0; i<unique.length; i++){

                data.addRow([unique[i],unique_occurenace[i]]);

            }
            
    
            var options = {
                
                'title':selected,
                'width':1000,
                'height':800,

            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(data, options);

        }
    }



    function onlyUnique(value, index, self) { 

        if(occurenace[self.indexOf(value)] == null){

            occurenace[self.indexOf(value)] = 0;

        }
           

        occurenace[self.indexOf(value)] +=1;

        //console.log(self.indexOf(value));

        return self.indexOf(value) === index;

    }

    function trimNull(el) {

        return el != null;

    }

    function findCum() {

        var selectedt_idx_array = [];

        for(var i = 0; i<datas_in_array.length-1; i++){

            selectedt_idx_array.push(datas_in_array[i][selected_indx]);

        }
        
        console.log(selectedt_idx_array);

        unique = selectedt_idx_array.filter( onlyUnique );
        //console.log(unique);

        unique_occurenace = occurenace.filter(trimNull);
        console.log(unique_occurenace);

    }

    function clearCache(){
        
        //after data filtering and chage form
        occurenace = [];
        unique_occurenace = [];
        unique = null;

    }
    
});

