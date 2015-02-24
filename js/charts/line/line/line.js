/** 
  * Line Chart - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Team.
*/ 


function createLineChart(){
 
   var chart= {}


      // returns a function that calculates the x coordinate of the given charts points. Given a value as input  returns the scaled  value in the range for a given data of domain with offset of 0.
      chart.scaleLineXcoordinateAccordingToRelativeWidth = function(){
          chart.scaledLineXcoord = d3.scale.ordinal()
          .rangeRoundBands([0, +chart.controls.relativeWidth()], chart.controls.barDistance);
      },


      // returns a function that calculates the y coordinate of the given charts points. Given a value  as input  returns the corresponding value in the range of  0 to .gContainer Height(relativeHeight) with offset of chart.barDistance.
      chart.scaleLineYcoordinateAccordingToRelativeHeight = function(){
          chart.scaledLineYcoord = d3.scale.linear()
            .rangeRound([+chart.controls.relativeHeight(), 0]);
      },


        //Scales X axis values according scaled Bars X coordination: 
      chart.scaleXAxisValuesAccordingToscaledLineXcoord = function(){
        chart.xAxis = d3.svg.axis()
          .scale(chart.scaledLineXcoord)
          .orient("bottom");    
      },


      //Scales Y axis values according scaled Bars Y coordination
      chart.scaleYAxisValuesAccordingToscaledLineYcoord = function(){
       chart.yAxis = d3.svg.axis()
          .scale(chart.scaledLineYcoord)
          .orient("left")
           .tickFormat(d3.format(chart.controls.yAxisFormat()));
      },
      

      chart.defineLinePath = function(){
        chart.linePath = d3.svg.line()
            .interpolate(chart.controls.interpolation)
            .x(function(d) { return chart.scaledLineXcoord(d.mainCategoryName)+ chart.scaledLineXcoord.rangeBand() / 2;  })
            .y(function(d) { return chart.scaledLineYcoord(d.value); });
      },



      //Ajax call from given url
      chart.fetchData = function() {
      d3.csv(chart.controls.url, function(error, data) {
          chart.incomingData = Vtool.charts.commonFunctionality.secureCSVData(data,chart.controls);
          chart.dataIsFetched(chart.incomingData);
          
             
        });
      },
     

     // constructing and mapping  data
      chart.mapVariables = function(data){ 
      chart.categoriesList =  d3.keys(data[0]).filter(function(key) { return key !== 'mainCategoryName'; }); //finds the  categories
      chart.seriesData = chart.categoriesList.map(function (name) {
          return { 
            name: name,
            values: data.map(function (d) {
                  return {mainCategoryName: d.mainCategoryName, value: +d[name]};
                })
            };
        });
  
        chart.scaledLineXcoord.domain(data.map(function (d) { return d.mainCategoryName; }));
        chart.scaledLineYcoord.domain([
          d3.min(chart.seriesData, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
          d3.max(chart.seriesData, function(c) { return d3.max(c.values, function(v) { return v.value;  }); })
         ]);

     },


     //Append  area container
     chart.appendChartContainer = function(){
      chart.chartContainer = chart.svg.append('g')
       .attr('class','chartContainer');
     },


    //Appends line container
     chart.appendChartLineContainer = function(){
      chart.LineContainer = chart.chartContainer.selectAll(".lineContainer")
            .data(chart.seriesData)
          .enter().append("g")
            .attr("class", "lineContainer")
     },


     //Appends lines
     chart.appendChartLines = function(data){
        chart.Line = chart.LineContainer.append("path")
          .attr("class", chart.controls.target+"line")
          .style("stroke", function(d) { return chart.colorRange(d.name);})
          .style("stroke-width", "3.5px")
          .style("fill", "none")
           .on("mouseover", function (d) {           
            d3.select(this).transition()        
              .duration(200).style("stroke-width", "6px").attr("opacity", "1");  })
           .on("mouseout",  function (d) {  
        
            d3.select(this).transition()        
                   .duration(200).style("stroke-width", "3.5px");  })
           chart.positionChartLines();
     }, 

    
  
     //Position lines
     chart.positionChartLines = function(){
      if(chart.interpolationImplementation){
            var animationTime=0;
        }else{
            var animationTime=500;
        
        }
          chart.Line.transition().duration(animationTime).attr("d", function(d) {return chart.linePath(d.values); })

     },

  
  
    //On window rize trigers responsive function
    chart.resize = function(){// resize function
      d3.select(window).on('resize.line', chart.responsive); 
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

          chart.scaleLineXcoordinateAccordingToRelativeWidth();
          chart.scaleLineYcoordinateAccordingToRelativeHeight();
          chart.scaleXAxisValuesAccordingToscaledLineXcoord();
          chart.scaleYAxisValuesAccordingToscaledLineYcoord();
          chart.defineLinePath();

      },

// chain of functions for responsive implementation   
    chart.responsive = function(){     
       chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
       d3.select(chart.controls.target+' svg').attr('width','100%').attr('height',angular.element(document.querySelector('#chartContainer'))[0].offsetHeight);
       chart.scaleValues();
       chart.scaleValues();
      chart.mapVariables(chart.incomingData); 
      chart.positionAxis();
      Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledLineXcoord,chart.scaledLineYcoord);
       chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
        

        chart.positionChartLines();
        
        Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(chart.incomingData,chart.controls,chart.scaledLineXcoord,chart.scaledLineYcoord);

        Vtool.charts.commonFunctionality.areaAssets.positionCyclesOnAppex(chart.controls,chart.LineContainer,chart.incomingData,chart.scaledLineXcoord,chart.scaledLineYcoord);


    
    },

    chart.dataIsFetched = function(data){
     Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);       
        chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(data,chart.controls);
        chart.mapVariables(data); 
         Vtool.charts.commonFunctionality.responsiveFunctionality.setSvgDimention(chart.controls);
        chart.createAxis();
        chart.grid = Vtool.charts.commonFunctionality.gridFunctionality.appendGrid(chart.controls,chart.svg,chart.scaledLineYcoord,chart.scaledLineXcoord);
        chart.appendChartContainer();
        chart.tooltipContiner = Vtool.charts.commonFunctionality.tableToolTip.appendDetails(chart.controls);
        chart.appendChartLineContainer();
        chart.appendChartLines(data);
        chart.appendLineTitle = Vtool.charts.commonFunctionality.areaAssets.appendLineTitle(data,chart.LineContainer,chart.controls, 

        chart.scaledLineXcoord,chart.scaledLineYcoord);
        Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(data,chart.controls,chart.scaledLineXcoord,chart.scaledLineYcoord);
        Vtool.charts.commonFunctionality.areaAssets.appendCyclesOnAppex(data,chart.controls,chart.LineContainer,chart.scaledLineXcoord,chart.scaledLineYcoord,chart.colorRange,chart.tooltipContiner);
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


        //override Local Settings
        chart.overrideLocalSettings = function(){
 
        chart.controls.contentTableShow = false;
        chart.controls.hasSubcategories = true;
        chart.controls.isPersentage = false;
        chart.controls.isLineChart=true;
        // interpolation : linear, cardinal, monotone, step-before, step-after    
        chart.controls.interpolation = 'cardinal';  
        chart.controls.url = "./csv/line/line/data.csv";
        chart.controls.target = 'dthree-Chart';
    },
 
         //Executes the chart
         chart.exe = function(data){
            chart.incomingData = data;
            chart.cerateLocalSettings();
            chart.overrideLocalSettings ();            
            chart.appendChart(data);
         },

        //Executes the chart insideIframe
        chart.exeFromIframe = function(data,controls){
            chart.controls = controls;
            chart.incomingData = data;
            chart.overrideLocalSettings ();            
            chart.appendChart(data);
         }

    //Object Chart returns init and local settings
     //Object Chart returns init and local settings
     return{
            init : function(data){
                chart.exe(data);
                return chart.controls;
             },
            initFromIframe : function(data,controls){
                chart.exeFromIframe(data,controls);
             },
             setIneerRadius : function(){
                chart.initializeArcObject();
                chart.positionBgColorToArc();
             },
            setColorSpectrum : function(controls){  
               chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(chart.categoriesList,controls);
                d3.selectAll('.dthree-Chartline').style("stroke", function (d,i) {return chart.colorRange(i); })

            },
            setCustomDimentions : function(controls){
                  chart.controls = controls;
                  chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
                  d3.select(controls.target+' svg').attr('width',controls.customWidth).attr('height',controls.customHeight);
                  chart.scaleValues();
                  chart.scaleValues();
                  chart.mapVariables(chart.incomingData); 
                  chart.positionAxis();
                  Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);    
                  Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(chart.incomingData,chart.controls,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  Vtool.charts.commonFunctionality.areaAssets.positionCyclesOnAppex(chart.controls,chart.LineContainer,chart.incomingData,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  chart.positionChartLines();
    
            },
            setResponsive : function(controls){
                  chart.controls = controls
                  d3.select(controls.target+' svg').attr('width','100%').attr('height',angular.element(document.querySelector('#chartContainer'))[0].offsetHeight)
                  chart.scaleValues();
                  chart.dataObjectArray = [];
                  chart.mapVariables(chart.incomingData); 
                  chart.positionAxis();
                  chart.points = d3.selectAll(".pointthree-Chart");
                  Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
                  Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(chart.incomingData,chart.controls,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  Vtool.charts.commonFunctionality.areaAssets.positionCyclesOnAppex(chart.controls,chart.points,chart.incomingData,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  chart.positionChartLines(); 
            },
            setlabelXAxisLabelAngle: function(controls){
                  Vtool.charts.commonFunctionality.xAxisFunctionality.positionXAxis(chart.XAxis,chart.xAxis,controls);
            },
         
            setInterpolation : function(controls){
                  chart.controls = controls;
                  chart.interpolationImplementation = true;
                  chart.scaleValues();
                 chart.mapVariables(chart.incomingData); 
                 chart.positionAxis();
                 chart.points = d3.selectAll(".pointthree-Chart");
                  Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(chart.controls,chart.svg,chart.grid,chart.scaledLineXcoord,chart.scaledLineYcoord);
                  chart.controls.xAxisLabelAngle = Vtool.charts.commonFunctionality.responsiveFunctionality.setLabelAngle(chart.controls);
                 Vtool.charts.commonFunctionality.areaAssets.positionLineTitle(chart.incomingData,chart.controls,chart.scaledLineXcoord,chart.scaledLineYcoord);
                 Vtool.charts.commonFunctionality.areaAssets.positionCyclesOnAppex(chart.controls,chart.points,chart.incomingData,chart.scaledLineXcoord,chart.scaledLineYcoord);
               chart.positionChartLines(); 
            }, 
            setGridSettings: function(controls){
                  Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(controls,chart.svg,chart.grid,chart.scaledLineXcoord,chart.scaledLineYcoord); 
                  Vtool.charts.commonFunctionality.gridFunctionality.styleGrid(controls);
            }, 

           


      }  


}