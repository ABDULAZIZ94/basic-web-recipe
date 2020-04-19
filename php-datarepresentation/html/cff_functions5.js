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

                var data = new google.visualization.DataTable();

                data.addColumn("string",tittles[3]);
                data.addColumn("number",tittles[11]);
                data.addColumn("number",tittles[17]);
                data.addColumn("string",tittles[7]);
                data.addColumn("number",tittles[0]);
                
                for(var i=0; i<datas_in_array.length; i++){
                    data.addRow([
                        datas_in_array[i][3],
                        parseInt(datas_in_array[i][11]),parseInt(datas_in_array[i][17]),
                        datas_in_array[i][7],parseInt(datas_in_array[i][0])
                    ]);
                }
      
                var options = {
                    title: 'Correlation between ' + tittles[3] + ", " +tittles[11] + ", " +tittles[17]
                    + ", " +tittles[7] + ", " +tittles[0],
                    hAxis: {title: tittles[11]},
                    vAxis: {title: tittles[17]},
                    bubble: {textStyle: {fontSize: 9}},
                    legend: { position: 'bottom'}
                  };
            
      
                            
                var chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));
                chart.draw(data, options);

        }
    }
    
});

