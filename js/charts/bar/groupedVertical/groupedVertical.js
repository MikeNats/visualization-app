
/** 
  * Grouped Vertical Chart - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  *Barnardos Web Team 
*/ 


function createBarChartGroupedVertical (settings,commonFunc){

     var chart = {};

       // returns a function that calculates the x coordinate of the given charts bar. Given a value as input  returns the scaled  value in the range for a given data of domain  with offset of controls.barDistance.
      chart.scaleBarsXcoordinateAccordingToRelativeWidth = function(){
          chart.scaledBarXcoord =  d3.scale.ordinal()
            .rangeRoundBands([0, chart.controls.relativeWidth()], chart.controls.barDistance);
      },


      // returns a function that calculates the y coordinate of the given charts bar. Given a value  as input  returns the corresponding value in the range of  0 to .gContainer Height(relativeHeight) with offset of controls.barDistance.
      chart.scaleBarsYcoordinateAccordingToRelativeHeight = function(){
          chart.scaledBarYcoord = d3.scale.linear()
            .range([chart.controls.relativeHeight(), 0]);
      },


      chart.scaleBarContainerWidthAccordingToGroupedNumerOfBars = function(){
          chart.scaleBarContainerWidth =  d3.scale.ordinal();

      }, 

     //Scales X axis values according scaled Bars X coordination
      chart.scaleXAxisValuesAccordingToscaledBarsXcoord = function(){
          chart.xAxis = d3.svg.axis()
            .scale(chart.scaledBarXcoord)
            .orient("bottom");  
      }, 
    

      //Scales Y axis values according scaled Bars Y coordination   
      chart.scaleYAxisValuesAccordingToscaledBarsYcoord = function(){
        chart.yAxis = d3.svg.axis()
          .scale(chart.scaledBarYcoord)
          .orient("left")
        //  .tickFormat(d3.format(controls.yAxis.format()));
      }, 


      //Ajax call from given url       
     chart.fetchData = function(){
  
      d3.csv(chart.controls.url, function(error, data) {
          chart.incomingData = Vtool.charts.commonFunctionality.secureCSVData(data,chart.controls);
          chart.dataIsFeched(chart.incomingData);
        });

     },


    //Finds the the number of categories and builds a nested object for each category  
     chart.buildRangeSubObjectBasedOnInput = function(data){
          chart.categoriesList =  d3.keys(data[0]).filter(function(key) { return key !== 'mainCategoryName'; });

          data.forEach(function(d) {
            chart.buildSubObject(data,chart.categoriesList)     

         });
      },


       //builds a nested object for each category       
      chart.buildSubObject = function (data,categoriesList){     
           data.forEach(function(d) {
              d.total = 0;
              d.categoriesObj = categoriesList.map(function(name) { return {name: name, value: +d[name]}; });

              d.categoriesObj.forEach(function(sb){
                  d.total = sb.value + d.total; 
              })             
           });
          Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);
          chart.mapVariables(data,categoriesList); 
          chart.incomingData = data;  
      },


      //Calculates a range of values for the given domain for the axis    
      chart.mapVariables = function(data,categoriesList){ 
          chart.scaledBarXcoord.domain(data.map(function(d) { return d.mainCategoryName; }));
          chart.scaleBarContainerWidth.domain(categoriesList).rangeRoundBands([0,chart.scaledBarXcoord.rangeBand()]);
          chart.scaledBarYcoord.domain([0, d3.max(data, function(d) { return d3.max(d.categoriesObj, function(d) {  return d.value; }); })]);
      }, 


    //appends a container for the grouped bars
    chart.appendbarContainer =  function(data){

          chart.groupedBars  =  chart.svg.selectAll(chart.controls.target+" .barContainer")
              .data(data)
              .enter().append("g")
              .attr("class", "barContainer");
          chart.positionBarContainer(data);         
    },


    //positions the container for the grouped bars  
    chart.positionBarContainer = function(){

          chart.groupedBars.attr("transform", function(d) { 
              return "translate(" + chart.scaledBarXcoord(d.mainCategoryName) + ",0)"; });
    },


     //Appends the bars of the chart  
    chart.appendBars = function(data){
        chart.bars =  chart.groupedBars.selectAll("rect")
              .data(function(d) {  return d.categoriesObj; })
              .enter().append("rect")
              chart.positionBars(data);           
    },


   //Sets the position and the dimention of each bar
    chart.positionBars = function(){
          chart.bars.attr("width", chart.scaleBarContainerWidth.rangeBand())
          .attr("x", function(d) {
                return chart.scaleBarContainerWidth(d.name);
          })
          .attr("y", function(d) { return chart.scaledBarYcoord(d.value);})
          .attr("height", function(d,i) {
          return chart.controls.relativeHeight() - chart.scaledBarYcoord(d.value); })
          .style("fill", function(d,i) { return chart.colorRange(i); });
         // console.log(chart.categoriesList);
    },

    //When window is resized resposive function is trigered    
    chart.resize = function(){// resize function
      d3.select(window).on('resize.grupedVertical', chart.responsive); 
    },

    //Create Axis
    chart.createAxis = function(){
        chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls); 
        chart.XAxis = Vtool.charts.commonFunctionality.xAxisFunctionality.appendXAxis(chart.svg);
        Vtool.charts.commonFunctionality.xAxisFunctionality.setXAxis(chart.XAxis,chart.xAxis,chart.controls);
        chart.YAxis = Vtool.charts.commonFunctionality.yAxisFunctionality.appendYAxis(chart.svg);
        Vtool.charts.commonFunctionality.yAxisFunctionality.setYAxis(chart.YAxis,chart.yAxis,chart.controls);
    },


    //Initiates hover states
    chart.appendChartInteractivity = function(data){
           Vtool.charts.commonFunctionality.tableToolTip.appendDetails(chart.controls);
           Vtool.charts.commonFunctionality.tableToolTip.onBarMouseOver(data,chart.groupedBars,chart.controls);
           Vtool.charts.commonFunctionality.tableToolTip.onBarMouseOut(data,chart.groupedBars,chart.controls); 
    },


    //Positions and  resizes the Axis
    chart.positionAxis = function(){
        Vtool.charts.commonFunctionality.xAxisFunctionality.positionXAxis(chart.XAxis,chart.xAxis,chart.controls);
        Vtool.charts.commonFunctionality.yAxisFunctionality.positionYAxis(chart.YAxis,chart.yAxis,chart.controls);
    },


    //Scale coordinates and values of the chart
     chart.scaleValues = function(){

          chart.scaleBarsXcoordinateAccordingToRelativeWidth();
          chart.scaleBarsYcoordinateAccordingToRelativeHeight();
          chart.scaleXAxisValuesAccordingToscaledBarsXcoord();
          chart.scaleYAxisValuesAccordingToscaledBarsYcoord();

          chart.scaleBarContainerWidthAccordingToGroupedNumerOfBars();

      },




    chart.responsive = function(data){// chain of functions for responsive implementation 
        chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
        d3.select(chart.controls.target+' svg').attr('width','100%').attr('height',angular.element(document.querySelector('#chartContainer'))[0].offsetHeight)
       chart.scaleValues();
        chart.mapVariables(chart.incomingData,chart.categoriesList);
        chart.positionAxis();
       Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
        chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
        chart.positionBarContainer(chart.incomingData);
        chart.positionBars(chart.incomingData);
        Vtool.charts.commonFunctionality.tableFunctionality.setTablePosition(chart.contentTable, chart.controls);


    },
 

      //Chain of functions that are trigered when data have been fetched form csv   
     chart.dataIsFetched = function(data){
        
        chart.buildRangeSubObjectBasedOnInput(data);        
        chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(chart.categoriesList,chart.controls);
        Vtool.charts.commonFunctionality.responsiveFunctionality.setSvgDimention(chart.controls);
        chart.createAxis();
        chart.grid = Vtool.charts.commonFunctionality.gridFunctionality.appendGrid(chart.controls,chart.svg,chart.scaledBarYcoord,chart.scaledBarXcoord);
        chart.svg =  Vtool.charts.commonFunctionality.appendChartContainer(chart.svg,chart.controls);
          chart.appendbarContainer(data);
       chart.appendBars(data);
       chart.contentTable =  Vtool.charts.commonFunctionality.tableFunctionality.appendTable(chart.controls,data,chart.colorRange,chart.categoriesList)
       chart.appendChartInteractivity(data);    
        if(chart.controls.isResponsive){ 
          chart.resize(data);
        }
     },


    //Chain of functions that build the chart
    chart.appendChart = function(data){
        chart.scaleValues();
        chart.svg = Vtool.charts.commonFunctionality.appendSvg(chart.controls);
         chart.dataIsFetched(data);
    },


    //Instatiation of charts settings and overides for  for local use
    chart.cerateLocalSettings = function(){
        chart.controls = Object.create(Vtool.charts.settings);
      

    },
  chart.overrideLocalSettings = function(){
      chart.controls.isPersentage = false;
      chart.controls.contentTableShow = true;
      chart.controls.hasSubcategories = true;
      chart.controls.url = "./csv/bar/groupedVertical/data.csv";
        chart.controls.target = 'dthree-Chart';

     }

     //Executes the chart
     chart.exe = function(data){
        chart.incomingData = data;
        chart.cerateLocalSettings();
        chart.overrideLocalSettings ();            
        chart.appendChart(data);
     }

    //Executes the chart insideIframe
    chart.exeUserControls = function(data,controls){

        chart.controls = controls;
        chart.incomingData = data;
        chart.overrideLocalSettings();  
        chart.appendChart(data);
     }

    //Object Chart returns init and local settings
     return{
            init : function(data){
                chart.exe(data);
                return chart.controls;
             },
            exeUserSettings : function(data,controls){

                chart.exeUserControls(data,controls);
  
             },
            setColorSpectrum : function(controls){  
              chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(chart.categoriesList,controls);
                chart.bars.style( 'fill' ,function(d,i){
                     return chart.colorRange(d.value);
                })

                d3.selectAll('.tableRect').style( 'fill' ,function(d,i){
                     return chart.colorRange(i);
                })

            },
            setCustomDimentions : function(controls){
                chart.controls = controls;
                d3.select(controls.target+' svg').attr('width',controls.customWidth).attr('height',controls.customHeight);
                chart.scaleValues();
                chart.mapVariables(chart.incomingData,chart.categoriesList);
                chart.positionAxis();
                Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
                chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
                chart.positionBarContainer(chart.incomingData);
                chart.positionBars(chart.incomingData);
                Vtool.charts.commonFunctionality.tableFunctionality.setTablePosition(chart.contentTable, chart.controls);
            },
            setResponsive : function(controls){
              chart.controls = controls;
              d3.select(controls.target+' svg').attr('width','100%').attr('height',angular.element(document.querySelector('#chartContainer'))[0].offsetHeight)
              chart.scaleValues();
                chart.mapVariables(chart.incomingData,chart.categoriesList);
                chart.positionAxis();
                Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
                chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
                chart.positionBarContainer(chart.incomingData);
                chart.positionBars(chart.incomingData);
                Vtool.charts.commonFunctionality.tableFunctionality.setTablePosition(chart.contentTable, chart.controls);
            },

            setlabelXAxisLabelAngle: function(controls){
              Vtool.charts.commonFunctionality.xAxisFunctionality.positionXAxis(chart.XAxis,chart.xAxis,controls);
            },
            setGridSettings: function(controls){
                Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
                Vtool.charts.commonFunctionality.gridFunctionality.styleGrid(controls);
               
            },
            shortAxis:function(controls,data){

               Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,controls);
                chart.scaleValues();
                chart.mapVariables(data,chart.categoriesList);    
                chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(chart.categoriesList,chart.controls);
                chart.positionAxis();
                Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
                chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
                chart.positionBarContainer(data);
                chart.positionBars(data);
                Vtool.charts.commonFunctionality.tableFunctionality.setTablePosition(chart.contentTable, chart.controls);

                chart.bars.style( 'fill' ,function(d){
                      return chart.colorRange(d.name);
                })
                  d3.selectAll('.tableRect').style( 'fill' ,function(d,i){
                     return chart.colorRange(i);
                })
               
            }

      } 


}
