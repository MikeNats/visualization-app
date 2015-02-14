/** 
  * Area Stack Stack  Chart - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Team.
*/ 

function createAreaChartStack(){

   
    var chart= {}

      chart.dataObject = [],
      chart.dataObjectArray = [],

      // returns a function that calculates the x coordinate of the given charts area. Given a value as input  returns the scaled  value in the range for a given data of domain with offset of 0.
      chart.scaleAreaXcoordinateAccordingToRelativeWidth = function(){
          chart.scaledAreaXcoord = d3.scale.ordinal()
          .rangeRoundBands([0, chart.controls.relativeWidth()], chart.controls.barDistance);
      },


      // returns a function that calculates the y coordinate of the given charts bar. Given a value  as input  returns the corresponding value in the range of  0 to .gContainer Height(relativeHeight) with offset of chart.barDistance.
      chart.scaleAreaYcoordinateAccordingToRelativeHeight = function(){
          chart.scaledAreaYcoord = d3.scale.linear()
            .rangeRound([chart.controls.relativeHeight(), 0]);
      },


        //Scales X axis values according scaled Bars X coordination: 
      chart.scaleXAxisValuesAccordingToscaledAreaXcoord = function(){
        chart.xAxis = d3.svg.axis()
          .scale(chart.scaledAreaXcoord)
          .orient("bottom");    
      },


      //Scales Y axis values according scaled Bars Y coordination
      chart.scaleYAxisValuesAccordingToscaledAreaYcoord = function(){
       chart.yAxis = d3.svg.axis()
          .scale(chart.scaledAreaYcoord)
          .orient("left")
           .tickFormat(d3.format(chart.controls.yAxisFormat()));
      },
      

      //Define stack
      chart.defineStack = function(){
         chart.stack =  d3.layout.stack()
          .offset(chart.controls.stackLayout)
          .values(function (d) {return d.values; })
          .x(function (d) { return chart.scaledAreaXcoord(d.xVariable) + chart.scaledAreaXcoord.rangeBand() / 2; })
          .y(function (d) { return d.yVariable; });
      },
      

      //Define stack area
      chart.defineArea = function(){
        chart.area = d3.svg.area().interpolate(chart.controls.interpolation)
          .x(function (d) { return chart.scaledAreaXcoord(d.xVariable) + chart.scaledAreaXcoord.rangeBand() / 2; })
          .y0(function (d) { return chart.scaledAreaYcoord(d.y0); })
          .y1(function (d) { return chart.scaledAreaYcoord(d.y0 + d.y); });
      },

      

      //Ajax call from given url
      chart.fetchData = function() {
      d3.csv(chart.controls.url, function(error, data) {
          chart.incomingData = Vtool.charts.commonFunctionality.secureCSVData(data,chart.controls);
          chart.dataIsFetched(chart.incomingData);
              chart.incommingData = data;
             
        });
      },

    // constructing and mapping  data
     chart.mapVariables = function(data){ 
        chart.categoriesList =  d3.keys(data[0]).filter(function(key) { return key !== 'mainCategoryName'; }); //finds the  categories   
        chart.categoriesList.forEach(function (category) { //builds an arry object with categoryname value  as attributes
            chart.dataObject[category] = {category: category, values:[]};
            chart.dataObjectArray.push(chart.dataObject[category]);

        });
        data.forEach(function (d) { 
          chart.categoriesList.map(function (category) {//push the value
            chart.dataObject[category].values.push({category: category, xVariable: d['mainCategoryName'], yVariable: +d[category]});
          });
        });
        chart.scaledAreaXcoord.domain(data.map(function (d) { return d.mainCategoryName; }));
        chart.stack(chart.dataObjectArray);
        chart.scaledAreaYcoord.domain([0, d3.max(chart.dataObjectArray, function (c) { 
           return d3.max(c.values, function (d) { return d.y0 + d.y; });
        })]);


     },

     //Append  area container
     chart.appendChartContainer = function(){
      chart.chartContainer = chart.svg.append('g')
       .attr('class','chartContainer');
     },
     

     //Appends chart container
     chart.appendChartAreaContainer = function(){
      chart.areaContainer = chart.chartContainer.selectAll(".areaContainer")
            .data(chart.dataObjectArray)
          .enter().append("g")
            .attr("class", "areaContainer")
     },


     //append the area 
     chart.appendChartArea = function(data){
        chart.areaPath =  chart.areaContainer.append("path")
          .attr("class", "streamPath")
          .style("fill", function (d,i) { return chart.colorRange(i); })
          .style("stroke", "black")
          .style("stroke-width", "0.5")
            .on("mouseover", function (d) {
                d3.select(this).transition().duration(200).attr('cursor','pointer').attr('stroke','black').attr("r", "10px");       
            })
           .on("mouseout",  function (d) { 
            d3.select(this).transition().duration(400).attr('cursor','normal').attr("r", "6px").attr('stroke','none');
      })
           chart.positionChartArea(data);
      },


     //position the area 
      chart.positionChartArea = function(){
        chart.areaPath.attr("d", function (d) { return chart.area(d.values); })
       
     },


    //appends points container on appex
     chart.appendPointContainer =  function(){
       chart.points = chart.svg.selectAll(".seriesPoints")
            .data(chart.dataObjectArray)
            .enter().append("g")
              .attr("class", "seriesPoints");
     },


  
    //On window rize trigers responsive function
    chart.resize = function(){// resize function
      d3.select(window).on('resize.areaStack', chart.responsive); 
    },


    //appends titles
    chart.createAxis = function(){
        chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);     
        chart.XAxis = Vtool.charts.commonFunctionality.xAxisFunctionality.appendXAxis(chart.svg);
        Vtool.charts.commonFunctionality.xAxisFunctionality.setXAxis(chart.XAxis,chart.xAxis,chart.controls); 
        chart.YAxis = Vtool.charts.commonFunctionality.yAxisFunctionality.appendYAxis(chart.svg);
        Vtool.charts.commonFunctionality.yAxisFunctionality.setYAxis(chart.YAxis,chart.yAxis,chart.controls);
       

    },

    //Positions and  resizes the Axis
    chart.positionAxis = function(){
        Vtool.charts.commonFunctionality.xAxisFunctionality.positionXAxis(chart.XAxis,chart.xAxis,chart.controls);
        Vtool.charts.commonFunctionality.yAxisFunctionality.positionYAxis(chart.YAxis,chart.yAxis,chart.controls);

    },


    //Scale coordinates and values of the chart
     chart.scaleValues = function(){

          chart.scaleAreaXcoordinateAccordingToRelativeWidth();
          chart.scaleAreaYcoordinateAccordingToRelativeHeight();
          chart.scaleXAxisValuesAccordingToscaledAreaXcoord();
          chart.scaleYAxisValuesAccordingToscaledAreaYcoord();
          chart.defineStack();
          chart.defineArea();

      },


    // chain of functions for responsive implementation 
     chart.responsive = function(){
       chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
       chart.scaleValues();
      chart.dataObjectArray = [];
      chart.mapVariables(chart.incomingData); 
      chart.positionAxis();
      Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledAreaXcoord,chart.scaledAreaYcoord);
      chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
      Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(chart.incomingData,chart.controls,chart.scaledAreaXcoord,chart.scaledAreaYcoord);
      Vtool.charts.commonFunctionality.areaAssets.positionCyclesOnAppex(chart.controls,chart.points,chart.incomingData,chart.scaledAreaXcoord,chart.scaledAreaYcoord);
       chart.positionChartArea();
      
    },
    
   // chain of functions when data is fetched from csv 
    chart.dataIsFetched = function(data){
        Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);       
        chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(data,chart.controls);
        chart.mapVariables(data); 
         Vtool.charts.commonFunctionality.responsiveFunctionality.setSvgDimention(chart.controls);
        chart.createAxis();
        chart.grid = Vtool.charts.commonFunctionality.gridFunctionality.appendGrid(chart.controls,chart.svg,chart.scaledAreaYcoord,chart.scaledAreaXcoord);
        chart.appendChartContainer();
        chart.tooltipContiner = Vtool.charts.commonFunctionality.tableToolTip.appendDetails(chart.controls);
        chart.appendChartAreaContainer();
        chart.appendChartArea(data);
        chart.appendPointContainer();   
        chart.appendLineTitle = Vtool.charts.commonFunctionality.areaAssets.appendLineTitle(data,chart.points,chart.controls, chart.scaledAreaXcoord,chart.scaledAreaYcoord);   
        Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(data,chart.controls,chart.scaledAreaXcoord,chart.scaledAreaYcoord);
        Vtool.charts.commonFunctionality.areaAssets.appendCyclesOnAppex(data,chart.controls,chart.points,chart.scaledAreaXcoord,chart.scaledAreaYcoord,chart.colorRange,chart.tooltipContiner);
        if(chart.controls.isResponsive){ 
           chart.resize(data);
        }
    }
     //Chain of functions that build the chart
    chart.appendChart = function(){
        chart.scaleValues();
        chart.svg = Vtool.charts.commonFunctionality.appendSvg(chart.controls);
        chart.fetchData();
    },


    //Instatiation of charts settings and overides for  for local use
    chart.cerateLocalSettings = function(){
        chart.controls = Object.create(Vtool.charts.settings);      
        chart.controls.contentTableShow = false;
        chart.controls.hasSubcategories = true;
        chart.controls.isLineChart=false;
        // stackLayout : zero, wiggle, silhouette, expand, expand
        chart.controls.stackLayout = 'zero';
         // interpolation : linear, cardinal, monotone, step-before, step-after    
        chart.controls.interpolation = 'cardinal';

        if(chart.controls.stackLayout == 'expand'){
              chart.controls.isPersentage = true;
        }else{
              chart.controls.isPersentage = false;
        }
        chart.controls.url = "./csv/area/stack/data.csv";
        chart.controls.target = '#chart06';
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