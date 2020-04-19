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
            //setOptions();
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

        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawAnnotations);

        function drawAnnotations() {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'ecocrop_code');
            data.addColumn('number', tittles[17]);
            data.addColumn('number', tittles[18]);
            
                                
            for(var i=0; i<datas_in_array.length; i++){

                data.addRow([
                    datas_in_array[i][0],
                    parseInt(datas_in_array[i][17]),
                    parseInt(datas_in_array[i][18])
                ]);
                
            }

            var options = {

                title: 'ecocrop_code vs agr_ecol_abst_rain_',

                trendlines: {
                    0: {type: 'linear', lineWidth: 5, opacity: .3},
                    1: {type: 'exponential', lineWidth: 10, opacity: .3}
                },

                annotations: {

                     alwaysOutside: true,

                    textStyle: {
                        fontSize: 14,
                        color: '#000',
                        auraColor: 'none'
                    }
                },

                hAxis: {
                    title: 'ecocrop_code',
                    format: 'number',
                    viewWindow: {
                    // min: [7, 30, 0],
                    // max: [17, 30, 0]
                    }
                },

                vAxis: {
                    title: 'agr_ecol_abst_rain_'
                },

                legend:'bottom',
                is3D:true,

            };
                
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);

        }
    }
    
});

