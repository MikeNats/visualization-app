/** 
  * Horizontal Bar Chart - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Development Team. 
*/ 


function createBarChartHorizontal(){
    
      var chart = { };

      // returns a function that calculates the x coordinate of the given charts bar. Given a value as input  returns the scaled  value in the range for a given data of domain  with offset of controls.style.barDistance.
      chart.scaleBarsXcoordinateAccordingToRelativeWidth= function(){
             chart.scaledBarXcoord = d3.scale.linear()
               .range([0,chart.controls.relativeWidth()]);
        },


      // returns a function that calculates the y coordinate of the given charts bar. Given a value  as input  returns the corresponding value in the range of  0 to .gContainer Height(relativeHeight) with offset of 0.
      chart.scaleBarsYcoordinateAccordingToRelativeHeight= function(){
            // Scale Bars Verticaly      
            chart.scaledBarYcoord = d3.scale.ordinal()
              .rangeRoundBands( [ chart.controls.relativeHeight(),0 ], chart.controls.barDistance); 
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
                .orient("left");
      },


      //Ajax call from given url 
      chart.fetchData = function (){
        d3.csv(chart.controls.url, function(error, data) {   
        chart.incomingData = Vtool.charts.commonFunctionality.secureCSVData(data,chart.controls);
          chart.dataIsFeched(chart.incomingData);    
        });
      },


      //Calculates a range of values for the given domain for the axis
      chart.mapVariablesOnAxis = function(data){
            chart.scaledBarXcoord.domain([0, d3.max( data , function( d ) { return +d.mainCategoryValue; })]);
            chart.scaledBarYcoord.domain( data.map( function( d ) { return d.mainCategoryName; }) );
      },


      //Appends the bars of the chart
      chart.appendBars = function (data){
        chart.svg =  chart.svg.selectAll( 'rect' ).data( data ).enter().append('rect')
            .style( 'fill' , chart.controls.lightbgColor )
            .attr("class", "bar"+chart.controls.target );
            chart.positionBars(data);   
         
    },


    //Sets the position and the dimention of each bar  
    chart.positionBars = function(data){
         chart.svg.attr("y",function(d) { return chart.scaledBarYcoord( d.mainCategoryName ); })
          .attr("x", 0)
          .attr("width",function(d) {  return  chart.scaledBarXcoord(  +d.mainCategoryValue  ); } )
          .attr("height", chart.scaledBarYcoord.rangeBand() ); 
    },


    //When window is resized resposive function is trigered 
    chart.resize = function(){// resize function
        d3.select(window).on('resize.horizontal', chart.responsive); 
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
       Vtool.charts.commonFunctionality.singleTooltip.onBarMouseOver(data,chart.svg,chart.controls);
       Vtool.charts.commonFunctionality.singleTooltip.onBarMouseOut(data,chart.svg,chart.controls);  
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
  },

  // chain of functions for responsive implementation 
  chart.responsive = function(){

      chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
      Vtool.charts.commonFunctionality.responsiveFunctionality.setSvgDimention(chart.controls);
      chart.scaleValues();
      chart.mapVariablesOnAxis(chart.incomingData);
      chart.positionAxis();
      Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid, chart.scaledBarXcoord,chart.scaledBarYcoord);
      chart.positionBars();
      chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
  },

  //Chain of functions that are trigered when data have been fetched form csv     
  chart.dataIsFeched = function(data){
       Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);
      chart.mapVariablesOnAxis(data);   
      chart.createAxis();
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
        chart.controls.target = '#chart1';
        chart.controls.url = "./csv/bar/horizontal/data.csv";
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
      },

   }
                    
}

