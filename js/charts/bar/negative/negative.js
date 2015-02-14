/** 
  * Negative Bar Chart - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Development Team. 
*/ 

function createBarChartNegative(){

    chart = {};

      // returns a function that calculates the x coordinate of the given charts bar. Given a value as input  returns the scaled  value in the range for a given data of domain  
      chart.scaleBarsXcoordinateAccordingToRelativeWidth= function(){
           chart.scaledBarXcoord = d3.scale.linear()
          .range([0, chart.controls.relativeWidth()]);
      },

      // returns a function that calculates the y coordinate of the given charts bar. Given a value  as input  returns the corresponding value in the range of  0 to .gContainer Height(relativeHeight) with offset of controls.style.barDistance .
      chart.scaleBarsYcoordinateAccordingToRelativeHeight= function(){
           chart.scaledBarYcoord  = d3.scale.ordinal()
          .rangeRoundBands([0, chart.controls.relativeHeight()], chart.controls.barDistance);
      },

      //Scales X axis values according scaled Bars X coordination
      chart.scaleXAxisValuesAccordingToscaledBarsXcoord = function(){
           chart.xAxis = d3.svg.axis()
              .scale(chart.scaledBarXcoord)
              .orient("top");
      },

      //Scales Y axis values according scaled Bars Y coordination
      chart.scaleYAxisValuesAccordingToscaledBarsYcoord = function(){
           chart.yAxisRight = d3.svg.axis()
              .scale(chart.scaledBarYcoord)
              .orient("left");
      },

      //Ajax call from given url 
      chart.fetchData = function(){
           d3.csv(chart.controls.url, function(error, data) {  
           chart.incomingData = Vtool.charts.commonFunctionality.secureCSVData(data,chart.controls);
           chart.dataIsFeched(chart.incomingData);
        });
      },

      //Calculates a range of values for the given domain for the axis
      chart.mapVariablesOnAxis = function(data){
        chart.scaledBarXcoord.domain(d3.extent(data, function(d) { return +d.mainCategoryValue; })).nice();
        chart.scaledBarYcoord.domain(data.map(function(d) { return d.mainCategoryName; }));
      },

      
      //Appends the bars of the chart
      chart.appendBars = function(data){
          chart.svg =  chart.svg.selectAll(".barContainer")
            .data(chart.incomingData)
            .enter().append('g')
            .attr('class','barContainer')
             .append("rect");
             chart.positionBars();
             chart.styleBars();         
      },
     

      //Sets the position and the dimention of each bar
      chart.positionBars = function(){
          chart.svg.attr("class", function(d) {  return +d.mainCategoryValue < 0 ? "bar negative" : "bar positive"; })
              .attr("x", function(d) {  return chart.scaledBarXcoord(Math.min(0, +d.mainCategoryValue)); })
              .attr("y", function(d) { return chart.scaledBarYcoord(d.mainCategoryName); })
              .attr("width", function(d) { return Math.abs(chart.scaledBarXcoord(+d.mainCategoryValue) - chart.scaledBarXcoord(0)); })
              .attr("height", chart.scaledBarYcoord.rangeBand());         
      },
      
      //Set the color of the bars
      chart.styleBars = function(){
          d3.selectAll(chart.controls.target+" .positive")
            .style('fill', chart.controls.darkbgColor);
         d3.selectAll(chart.controls.target+" .negative")
           .style('fill', chart.controls.lightbgColor);
      },
     

      //Appends a vertical axis 
      chart.appendYAxisHelper = function (){
          chart.YAxisHelper = chart.svg.append("g")
              .attr("class", "y axis")
              .append("line")
              .attr('stroke', '#000');
          chart.positionYAxisHelper();
      },

      //Sets the position and the dimention of the axis according to 0 coordinate  
      chart.positionYAxisHelper = function(){
        chart.YAxisHelper.attr("x1", chart.scaledBarXcoord(0))
            .attr("x2", chart.scaledBarXcoord(0))
            .attr("y2", chart.controls.relativeHeight());
      },


      //When window is resized resposive function is trigered 
      chart.resize = function(){// resize function
        d3.select(window).on('resize.negative', chart.responsive); 
      },



      //Create Axis
      chart.createAxis = function(){
        chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls); 
        chart.XAxis = Vtool.charts.commonFunctionality.xAxisFunctionality.appendXAxis(chart.svg);
        Vtool.charts.commonFunctionality.xAxisFunctionality.setXAxis(chart.XAxis,chart.xAxis,chart.controls);
        chart.YAxis = Vtool.charts.commonFunctionality.yAxisFunctionality.appendYAxis(chart.svg);
        Vtool.charts.commonFunctionality.yAxisFunctionality.setYAxis(chart.YAxis,chart.yAxisRight,chart.controls);
      },


      //Initiates hover states
      chart.appendChartInteractivity = function(data){
           Vtool.charts.commonFunctionality.tableToolTip.appendDetails(chart.controls);
           Vtool.charts.commonFunctionality.singleTooltip.onBarMouseOver(data,chart.svg,chart.controls);
           Vtool.charts.commonFunctionality.singleTooltip.onBarMouseOut(data,chart.svg,chart.controls); 
        },


      //Positions and  resizes the Axis
      chart.positionAxis = function(){
          Vtool.charts.commonFunctionality.xAxisFunctionality.positionXAxis(chart.XAxis,chart.xAxis,chart.controls);
          Vtool.charts.commonFunctionality.yAxisFunctionality.positionYAxis(chart.YAxis,chart.yAxisRight,chart.controls);
          chart.positionYAxisHelper();
      },


      //Scale coordinates and values of the chart
      chart.scaleValues = function(){
          chart.scaleBarsXcoordinateAccordingToRelativeWidth();
          chart.scaleBarsYcoordinateAccordingToRelativeHeight();
          chart.scaleXAxisValuesAccordingToscaledBarsXcoord();
          chart.scaleYAxisValuesAccordingToscaledBarsYcoord();
      },


      // chain of functions for responsive implementation 
      chart.responsive = function(){
          chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
          Vtool.charts.commonFunctionality.responsiveFunctionality.setSvgDimention(chart.controls);
          chart.scaleValues();
          chart.mapVariablesOnAxis(chart.incomingData);
          chart.positionAxis();
          Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledBarXcoord,chart.scaledBarYcoord);
          chart.positionBars();
          chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
      },


      //Chain of functions that are trigered when data have been fetched form csv
      chart.dataIsFeched = function(data){
          Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);
          chart.mapVariablesOnAxis(data);
          chart.createAxis();
          chart.appendYAxisHelper();
          chart.grid = Vtool.charts.commonFunctionality.gridFunctionality.appendGrid(chart.controls,chart.svg,chart.scaledBarYcoord,chart.scaledBarXcoord);
       
         chart.svg = Vtool.charts.commonFunctionality.appendChartContainer(chart.svg,chart.controls);
          chart.appendBars(data);
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
          chart.controls.contentTableShow = false;
          chart.controls.hasSubcategories = false;
          chart.controls.isNegative = true;
          chart.controls.target = '#chart3';
          chart.controls.url = "./csv/bar/negative/data.csv";
      },

      //Executes the chart
      chart.exe = function(){
          chart.cerateLocalSettings();
          chart.appendChart();
      }

      //Object Chart returns init and local settings
      return {
        init : function(){
            chart.exe();
        },
        returnCustomChartSettings : function(){
            return chart.controls;
        }
    }

}


