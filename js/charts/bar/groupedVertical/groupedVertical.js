
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
          Vtool.charts.commonFunctionality.sortDataFunctionality.sortXAxisQuantities(data,chart.controls);
          chart.mapVariablesOnAxis(data,categoriesList); 
          chart.incomingData = data;    
      },


      //Calculates a range of values for the given domain for the axis    
      chart.mapVariablesOnAxis = function(data,categoriesList){ 
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
              .data(function(d) { return d.categoriesObj; })
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
          .style("fill", function(d) { return chart.colorRange(d.name); });
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

       chart.scaleValues();
        chart.mapVariablesOnAxis(chart.incomingData,chart.categoriesList);
        chart.positionAxis();
         Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
        chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
        chart.positionBarContainer(chart.incomingData);
        chart.positionBars(chart.incomingData);
        Vtool.charts.commonFunctionality.tableFunctionality.setTablePosition(chart.contentTable, chart.controls);


    },


      //Chain of functions that are trigered when data have been fetched form csv   
     chart.dataIsFeched = function(data){
        Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);
        chart.buildRangeSubObjectBasedOnInput(data);        
        chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(data,chart.controls);
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
    chart.appendChart = function(){
        chart.scaleValues();
        chart.svg = Vtool.charts.commonFunctionality.appendSvg(chart.controls);
        chart.fetchData();
    },


    //Instatiation of charts settings and overides for  for local use
    chart.cerateLocalSettings = function(){
        chart.controls = Object.create(Vtool.charts.settings);
        chart.controls.isPersentage = false;
        chart.controls.contentTableShow = true;
        chart.controls.hasSubcategories = true;
        chart.controls.url = "./csv/bar/groupedVertical/data.csv";
        chart.controls.target = '#chart01';

    },


    //Executes the chart
     chart.exe = function(){
        chart.cerateLocalSettings();
        chart.appendChart();
     }

    //Object Chart returns init and local settings
     return{
        init : function(){
            chart.exe();
         },
         customSettings : function(){
            return controls;
        } 
      }  


}
