//raw
var tittles = [];
var datas = [] ;

//processed data
var datas_in_array = [];

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

    var xmlhttps = new XMLHttpRequest();
    xmlhttps.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           
            var res_string = this.responseText;
            datas =  res_string.split('\\n');     

            for(var i=0; i < datas.length; i++){

                datas_in_array[i] = datas[i].split(",");

            }

            drawAreaGraph();

        }
    };

    xmlhttps.open("GET", "select_raw.php" , true);
    xmlhttps.send();

    function drawAreaGraph(){

        google.charts.load("current", {packages:["corechart"]});

        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
      
            function drawChart() {

                var data = new google.visualization.DataTable();

                data.addColumn("string",tittles[2]);
                data.addColumn("number",tittles[19]);
                data.addColumn("number",tittles[20]);
                
                for(var i=0; i<datas_in_array.length; i++){
                    data.addRow([datas_in_array[i][2],parseInt(datas_in_array[i][19]),parseInt(datas_in_array[i][20])]);
                }
      
                var options = {
                    
                    title: 'sci_name vs agr_ecol_abst_rain',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                    
                };
      
                var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
              
                chart.draw(data, options);

            }

        }

    }

    
});

