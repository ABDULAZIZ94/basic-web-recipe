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

                data.addColumn("number",tittles[0]);
                data.addColumn("number",tittles[11]);
                data.addColumn("number",tittles[12]);
                
                for(var i=0; i<datas_in_array.length; i++){
                    data.addRow([parseInt(datas_in_array[i][0]),parseInt(datas_in_array[i][11]),parseInt(datas_in_array[i][12])]);
                }
      
              var options = {

                title: "ecocrop_code vs agr_ecol_opt_temp",
                hAxis: {title: 'ecocrop_code',  titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0},
                legend:'bottom',
                is3D:true,

              };
      
              var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
              chart.draw(data, options);

            }

        }
    }

    
});

