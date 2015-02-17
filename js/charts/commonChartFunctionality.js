/** 
  * Common Chart Function - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Development Team. 
*/ 

function commonChartFunctionality () {
       
      var charts = {

            //Append's svg and g container
            appendSvg : function(controls){// Appends svg and a g childs

                        return d3.select(controls.target).append("svg").attr("width", function(){
                            if(controls.isResponsive){
                                return '100%';
                             }else{
                                 return controls.customWidth;
                            }})
                            .attr("height", controls.svgHeight() -3 ).style("background",controls.bgColor)
                            .append("g").attr('class','gContainer').attr('width','100%').attr("transform", "translate(" + controls.marginLeft() + "," + controls.marginTop() + ")");
            },

            //Appends g container for the chart
            appendChartContainer : function (svg,controls){
                  return svg.append("g")
                           .attr("class", "chartContainer")
                           .attr("transform","translate(0,0)" );
            },

            //For security reasons we change the main variable (main category) of the fetched data to secure any human mistake in csv.
            secureCSVData : function(data,hasSubcategories){  
                      var obj ={};
                      /************* fetched object array (data) becomes a string of characters  and then is been cleaned from unessesary characters **************/ 
                      obj = data.toSource()//object array becomes a string of characters
                      obj = obj.replace(/\{/gi, "");//remove all {
                      obj = obj.replace(/\[/gi, "");//remove all }
                      obj = obj.replace(/\]/gi, "");//remove all ]
                      obj = obj.replace(/ /gi,"");//remove all spaces
                      var numberOfObjects = obj.length - obj.replace(/}/g, "").length;//find the number of } == number of object
                      obj = obj.replace(/\},/gi,"|");//replace all }, with |
                      obj = obj.replace(/\}/gi,"");//replace final } from the end
                      /**********************  Finds the name of the main variable ****************************/
                      var getMainVariable = obj.substr(0, obj.indexOf('|')); //get the first set pair of attributes
                      var categoryName = getMainVariable.substr(0, getMainVariable.indexOf(':')); //stores the name of the first attribute
                      var categoryValue = getMainVariable.split(',').pop();//gets the second attribute 
                      categoryValue= categoryValue.substr(0, categoryValue.indexOf(':'))//gets the name of the attribute
                      //swaps the name of the attributes with default name.
                      data.forEach(function(e) {      
                          e.mainCategoryName = e[categoryName];
                          delete e[categoryName]; 
                          if(!hasSubcategories){
                              e.mainCategoryValue = e[categoryValue];
                              delete e[categoryValue];
                           }
                       });
                       return data
            },

            //***********  X Bottom Axis  ***********//

            xAxisFunctionality : {


                  //Appends  X Bottom Axis  Container
                  appendXAxis : function(svg) {

                      return  svg.append("g").attr("class", "x axis");    

                  },


                  //Sets Axis assets
                  setXAxis: function(XAxis,xAxis,controls){

                       charts.xAxisFunctionality.appendXAxisLabel(XAxis,xAxis,controls); 
                       charts.xAxisFunctionality.positionXAxis(XAxis,xAxis,controls);   
                  },


                  //Appends  axis's label
                  appendXAxisLabel : function(XAxis,xAxis,controls){      

                       XAxis.call(xAxis)
                          .append("text")
                          .attr("transform", "rotate("+0+")")
                          .attr("y", controls.xAxisLabaleY)
                          .attr("x",controls.xAxisLabaleX)
                          .attr("dy", ".35em")
                          .style("text-anchor", "end")
                          .attr('class','xBottomLabel')
                          .text(controls.xAxisLabelName)
                          .attr('font-size',controls.xAxisFontSize);
                  },


                  //Position X Bottom  Axis and its assets
                  positionXAxis :function(XAxis,xAxis,controls){  

                    XAxis.attr("transform", "translate(0," + controls.relativeHeight() + ")")
                          .call(xAxis)
                          .selectAll("text")  
                          .style("text-anchor", "start")
                          .attr("dx", controls.xAxisPositionDxDy().dx +'em')
                          .attr("dy",  controls.xAxisPositionDxDy().dy +'em')
                          .attr("x", 0)
                          .attr("transform", function(d) {
                              return "rotate("+ controls.xAxisLabelAngle +")";})
                          .style('font-size', controls.xAxisFontSize+'px');

                    d3.select(controls.target+' .xBottomLabel').attr("transform", function(d) {
                              return "rotate("+0+")";})
                         .attr('x',d3.select(controls.target+' .x.axis').node().getBBox().width );

                 },

          },

          //*********** X Top Axis *************//

         xAxisTopFunctionality : { 

                // Append Top X Axis Container
                appendXTopAxis : function(svg){

                      return svg.append("g").attr("class", "x top axis").attr("transform", "translate(0,0)");
               },


              //Sets Axis assets
              setXTopAxis : function(XAxisTop,xAxisTop,controls){

                     charts.xAxisTopFunctionality.appendXTopAxisLabel(XAxisTop,xAxisTop,controls); 
                     charts.xAxisTopFunctionality.positionXAxisTop(XAxisTop,xAxisTop,controls);   

               },

               //Position  Top X Axis  and its assets
               appendXTopAxisLabel : function(XAxisTop,xAxisTop,controls){

                    XAxisTop.append("text")
                        .attr("transform", "rotate("+0+")")
                        .attr("y", controls.xAxisTopLabelX)
                        .attr("x",controls.xAxisTopLabelY)
                        .attr("dy", ".35em")
                        .attr("dx", "-6em")
                        .style("text-anchor", "start")
                        .attr('class','xTopLabel')
                        .text(controls.xAxisTopLabelName)
                        .attr('font-size',controls.xAxisTopLabelFontSize);

               },

              //Appends  position Axis
               positionXAxisTop : function(XAxisTop,xAxisTop,controls){

                    XAxisTop.attr("transform", "translate(" +0 + ",0)")
                       .call(xAxisTop)
                       .selectAll('text')
                       .style("text-anchor", "end")
                       .attr('dx',controls.xAxisTopPositionDxDy().dx+'em')
                       .attr('dy',controls.xAxisTopPositionDxDy().dy+'em')
                       .attr("transform", function(d) {
                        if(controls.xAxisLabelAngle < 45){

                          var angle = 45;
                        }else{

                           var angle = controls.xAxisLabelAngle ;
                        }
                            return "rotate("+ angle+")"    
                        })
                        .style('font-size', controls.xAxisFontSize+'px');
                    d3.select(controls.target+' .xTopLabel').style("text-anchor", "start").attr('dx','-6em').attr("transform", function(d) {
                            return "rotate("+0+")"})
                       .attr('x',d3 .select(controls.target+' .x.axis').node().getBBox().width );
                     
                },

          },

          //***********  Y Left Axis *************//

          yAxisFunctionality : {
                
                  // Append  Y left Axis Container
                  appendYAxis : function(svg){

                       return svg.append("g").attr("class", "y axis left");   

                 },

                //Sets Axis  Y left  Aassets
                 setYAxis : function(YAxis,yAxis,controls){

                      charts.yAxisFunctionality.appendYAxisLabel(YAxis,yAxis,controls); 
                      charts.yAxisFunctionality.positionYAxis(YAxis,yAxis,controls);   
                 },

                //Position Axis
                positionYAxis : function(YAxis,yAxis,controls){

                     YAxis.call(yAxis);

                 },

                //Position Axis  Y left  Label
                appendYAxisLabel : function(YAxis,yAxis,controls){

                      YAxis.append("text")
                        .attr("transform", "rotate("+0+")")
                        .attr("y", controls.yAxisLabelY)
                        .attr("x",controls.yAxisLabelX)
                        .attr("dy", "-.39em")
                        .style("text-anchor", "end")
                        .attr('class','xBottomLabel')
                        .text(controls.yAxisLabelName)
                        .attr('font-size',controls.yAxisLabelFontSize);
                },



          },

          //***********  Y Right Axis *************//

          yAxisRightFunctionality : {
            

                // Append  Y Right Axis Container
                appendYAxisRight : function(svg){

                      return svg.append("g").attr("class", "y axis right");                     
                },

                //Set Y Axis asset's
                setYAxis : function(YAxis,yAxis,controls){

                       charts.yAxisRightFunctionality.appendYAxisRightLabel(YAxis,yAxis,controls); 
                       charts.yAxisRightFunctionality.positionYAxisRight(YAxis,yAxis,controls);

                },

               //Append Y Right Axis Label
               appendYAxisRightLabel : function(YAxis,yAxis,controls){// Append YAxis Right

                      YAxis.append("g")
                          .append("text")
                          .attr("transform", "rotate("+ 0 +")")
                          .attr('class','yRightLabel')
                          .attr("dx", '0.1em')
                          .attr("dy", "-.41em")
                          .style("text-anchor", "start")
                          .text(controls.yAxisRightLabelName)
                          .attr('font-size',controls.yAxisRightFontSize);

                },

              //Position Y Axis Right
              positionYAxisRight : function(YAxis,yAxis,controls){// Position YAxis Right 
                     YAxis.attr("transform", "translate( "+ controls.relativeWidth()+",0)")
                          .call(yAxis).selectAll(".tick text").attr("dx", '0.1em')
                          .attr("transform", "rotate("+ 0 +")")
                      d3.select('.yRightLabel').attr("transform", "rotate("+ 0 +")").style("text-anchor", "start").attr("dy", "-.41em");
              },

          },

          //*********** Short Data *************//

          sortDataFunctionality :{

             //Sort Axis
             shortData : function(data,controls){

                    Vtool.charts.commonFunctionality.sortDataFunctionality.sortXAxisVariables(data,controls);
                    Vtool.charts.commonFunctionality.sortDataFunctionality.sortXAxisQuantities(data,controls);

              },

            //Sort X Axis Categories 
            sortXAxisVariables : function(data,controls){

                   if(controls.sortMaxToMinAxisVariable){ // max -> min
                    //  data.sort(function(a, b) { return b.mainCategoryName - a.mainCategoryName; });
                          data.sort(function(a, b) { 
                            if (a.mainCategoryName > b.mainCategoryName) {
                              return 1;
                            }
                            if (a.mainCategoryName < b.mainCategoryName) {
                              return -1;
                            }   
                            return 0;                     
                         });
                    }
                   if(controls.sortMinToMaxAxisVariable){// min -> max
                       data.sort(function(a, b) {    
                            if (a.mainCategoryName < b.mainCategoryName) {  
                                return 1;                           
                            }
                           if (a.mainCategoryName > b.mainCategoryName) {  
                                return -1;
                            }                     
                            return 0;                     
                      });
                   }
                },

            //Sort X Axis Quantities of Categories 

            sortXAxisQuantities : function(data,controls){
                  if(controls.sortMaxToMinAxisQuantitie){ //max -> min
                       data.sort(function(a, b) { 
                          if(controls.hasSubcategories){
                             return b.total - a.total; 
                          }else{
                               return b.mainCategoryValue - a.mainCategoryValue; 
                          }  
                      });
                  }
                  if(controls.sortMinToMaxAxisQuantitie){
                      data.sort(function(b, a) { 
                          if(controls.hasSubcategories){
                              return b.total - a.total; 
                          }else{
                               return b.mainCategoryValue - a.mainCategoryValue; 
                          }

                      });
                  }
               }
         },

         //***********  Color Spectrum  *************//

         colorFunctionality:{

            //Scales color spectrum
            scaleColorSecturm : function(data,controls){
                  var colorRange = d3.scale.ordinal()
                  .range(charts.colorFunctionality.findColorSpectrumBasedOnTheNumberOfCateries(data,controls));
                 
                 //colorRange.domain(d3.keys(data[0]).filter(function(key) { return key !== 'mainCategoryName'; }));

                  return colorRange;
             },

             //Find Color Spectrum Based On The Number Of Cateries
             findColorSpectrumBasedOnTheNumberOfCateries : function(data,controls){
                  var categories = data// d3.keys(data[0]).filter(function(key) { return key !== 'mainCategoryName'; });
                  var colorArray = [];
                  var colors =  d3.scale.linear()
                        .domain([0, categories.length])
                        .range([controls.darkbgColor , controls.lightbgColor]);
                  for(var i  in categories){
                        colorArray.push(colors(i));
                  } 
                  return colorArray;      
             }

        },

        //***********  Grids  *************//

         gridFunctionality : {

              //Grid handler to append  horizontal vertical grid
              appendGrid : function(controls,svg,scaledBarYcoord,scaledBarXcoord){// checks users choice on show/hide Grid
                 var grid = {}
                  if(controls.gridAppend){
                    if(controls.horizontalGridAappend){
                        grid.horizontalGrid =  Vtool.charts.commonFunctionality.gridFunctionality.appendHorizontalGrid(svg,scaledBarYcoord,controls);
                    }
                    if(controls.verticalGridAppend){
                        grid.verticalGrid  = Vtool.charts.commonFunctionality.gridFunctionality.appendVerticalGrid(svg,scaledBarXcoord,controls);
                    }
                  }
                  Vtool.charts.commonFunctionality.gridFunctionality.positionGrid(controls,svg,grid,scaledBarXcoord,scaledBarYcoord);

                  return grid;

                },

               //Positions and  resizes  Grids handler
                positionGrid :  function(controls,svg,grid,scaledBarXcoord,scaledBarYcoord){
                  if(controls.gridAppend){
                        if(controls.horizontalGridAappend){
                            Vtool.charts.commonFunctionality.gridFunctionality.positionVerticalGrid(svg,grid,scaledBarXcoord,controls);
                        }if(controls.verticalGridAppend){
                            Vtool.charts.commonFunctionality.gridFunctionality.postisionHorizontalGrid(svg,grid,scaledBarYcoord,controls);
                        }          
                    } 
                },

              //append Vertical Grid
              appendVerticalGrid : function(svg,scaledBarXcoord,controls){// append Vertical Grid
                       
                       return svg.append("g")
                          .attr("class", "grid verticalGrid");
              },

              //position Vertical Grid    
              positionVerticalGrid : function(svg,grid,scaledBarXcoord,controls){// position Vertical Grid
                   
                      grid.verticalGrid.attr("transform", "translate(0," + controls.relativeHeight() + ")")
                        .call(charts.gridFunctionality.make_x_axis(svg,scaledBarXcoord,controls)
                            .tickSize(-controls.relativeHeight(), 0, 0)
                            .tickFormat("")
                        ).attr('opacity', controls.verticalGridStrokeOpacity)
              },

              // create  Horizontal axis used as grid line
              make_x_axis : function(svg,scaledBarXcoord,controls){// create  Horizontal axis used as grid line

                      return d3.svg.axis()
                        .scale(scaledBarXcoord )
                        .orient("bottom")
                        .ticks(controls.verticalGridTiks);
              },

              //Append Horizontal Grid
              appendHorizontalGrid : function(svg,scaledBarYcoord,controls ){

                   return svg.append("g").attr("class", "grid horizontalGrid");
  
              },

              //Postision Horizontal Grid
              postisionHorizontalGrid : function(svg,grid,scaledBarYcoord,controls ){

                    grid.horizontalGrid.call(charts.gridFunctionality.make_y_axis(svg,scaledBarYcoord,controls )
                        .tickSize(- controls.relativeWidth(), 0, 0)
                        .tickFormat(""))
                        .attr('opacity', controls.horizontalGridStrokeOpacity)

              },

              // create  Vertical axis used as grid line
              make_y_axis : function(svg,scaledBarYcoord,controls) {

                        return d3.svg.axis()
                        .scale(scaledBarYcoord)
                        .orient("left")
                        .ticks(controls.horizontalGridTiks)  
              },


        },

        //***********  Content Table *************//

        tableFunctionality : {

              //Appends table
              appendTable : function(controls,data,colorRange,categoriesList){// append Content Table
          
                  var currentContentTable =  d3.select(controls.target+' .gContainer').append("g")
                     .attr("class", "tableContainer")
                   Vtool.charts.commonFunctionality.tableFunctionality.setTablePosition(currentContentTable,controls); 

                   Vtool.charts.commonFunctionality.tableFunctionality.appendTableContent(currentContentTable,data,colorRange,controls,categoriesList);  
              return currentContentTable;
              },

              //set Table Position
             setTablePosition : function(currentContentTable,controls){// position content table
                 if(charts.responsiveFunctionality.checkViewPortWidth() > controls.mobileViewPort){

                      if(d3.select('.y.axis.left')==null ){

                        var yAxisLeftWidth = d3.select('.y.axis.left').node().getBBox().width ;  
                         
                      }else{

                         var yAxisLeftWidth = 0;
                      }

                     currentContentTable.attr("transform",function(){
                        return  "translate("+ ( +d3.select('.chartContainer').node().getBBox().width + yAxisLeftWidth+ controls.marginLeft()/2  ) +','+0+')'; 
                    });

                }else{
                    charts.tableFunctionality.positionMobileTable(currentContentTable);
                }   
            },

            //Append Table Content
            appendTableContent : function(currentContentTable,data,colorRange,controls,categoriesList){

                charts.tableFunctionality.legend =  currentContentTable.selectAll(".legend") //append legend
                  .data(categoriesList)
                  .enter().append("g")
                  .attr("class" ,function(d,i){

                     return 'legent legent'+i;
                  })
                charts.tableFunctionality.legendText = charts.tableFunctionality.legend.append("text") //append text
                  .attr("class", "tableContentText")
                  .attr("x",controls.fontSize+5)
                  .attr("y", function(){

                      return (controls.fontSize/4)+4;
                  })
                  .attr("dy", ".35em")
                  .attr('text-anchor',"start")
                  .text(function(d,i) {  return categoriesList[i]; })
                  .style('font-size', function(i){
                      return controls.fontSize-2 +'px';
                  })
                charts.tableFunctionality.legend.append("rect")// append rect that defines the category color
                  .attr("width", function(){
                      return 15* (controls.fontSize/15);
                  })  

                  .attr("x", 0)
                  .attr('class',function(i){

                    return 'tableRect tableRect'+i;

                  })
                  .attr("height", function(){

                      return 15* (controls.fontSize/15);

                  })
                  .style("fill", function(d,i){

                       return colorRange(categoriesList[i]);
                  });
                charts.tableFunctionality.legend.attr("transform", function(d, i) {
                  return "translate("+ 0 +"," + i * (15* (controls.fontSize/15) +5) + ")";      
                });

               

            },


            //Position Table when viewport is mobile;
            positionMobileTable : function(currentContentTable){  

                var y = parseInt(d3.select('.chartContainer').node().getBBox().height) + parseInt(d3.select('.y.axis').node().getBBox().width);
                currentContentTable.attr("transform", "translate("+ 0 +','+ y +')'); 

                

            }
      },

      //***********  On window resize *************//

      responsiveFunctionality : {

            //Return viewportWidth  
            checkViewPortWidth : function(controls){ //Checks and update viewport width

                    return d3.select(window)[0][0].innerWidth;
            },

            //Rotates Label according to viewport Width
            setLabelAngle :  function(controls){//Sets xAxisLabel when window is resizing 
                if(controls.automatedLabelAngle){
                     if( Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth() > controls.tabletViewPort &&  Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth() < controls.desktopViewPort){ 
                          return 45;
                      }else if(Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth() < controls.tabletViewPort && Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth() > controls.mobileViewPort){
                          return 65;
                      }else if(Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth() < controls.mobileViewPort){
                          return 90;
                      }else{
                            return 0;    
                      }
                }else{

                  return controls.cutomAngle;
                }
            },

            //sets Svg Height
            setSvgDimention : function(controls){

                d3.select(controls.target+' svg').attr('height',(d3.select(window)[0][0].innerHeight)-10);

            },
      },

      tableToolTip:{
            
           //Appends message container
           appendDetails :  function (controls) { //appendDetails            
              return  charts.tableToolTip.appendDetailsHtml = d3.select(controls.target).append('div')
                  .attr("class", "message hide")  
                  .style('position', 'absolute')
                  .style('padding', '0 10px')
                  .style('background', 'white')
                  .style('opacity', 1)
                  .style('font-size','10px')
                  .style('border','1px solid #333')
                  .style('width','auto'); 
            }, 

           //Appends html in the  message container
            appendHtmlDetails : function (controls,data,d){// Appends tooltip when bar is Hovered

              var barDetails = '<p><strong>'+d.mainCategoryName + '<br /> Total :</strong> '+ d.total+' <br />' ;
              d.categoriesObj.forEach(function(hoverdBar) {
                var value  = null;          
                value = d[hoverdBar.name];
                barDetails = barDetails +'<strong>'+ hoverdBar.name +' :</strong> ' + value + ', <br />' ;
              });
              barDetails = barDetails +'</p>';
              
              return  barDetails; 

            },

            //Triger events on stack bar Hovered
            onBarMouseOver : function(data,barContainer,controls){ // Triger Event when Bar is Hovered 

              charts.tableToolTip.tooltip = barContainer.on('mouseover', function(d){  
              charts.tableToolTip.selectHoveredBar(this,controls)
              d3.select(controls.target+' .message').html(charts.tableToolTip.appendHtmlDetails(controls,data,d))
                  .style('right', (d3.select(window)[0][0].outerWidth - d3.select('.chartContainer').node().getBBox().width   - controls.marginLeft() ) + 'px')
                  .style('top', + controls.marginTop()  + 'px')
                  .classed('hide',false); 
              });

            },
            
            //Animation when bar is hovered
            selectHoveredBar : function(hoverObject,controls){// stylies the hovered  bar

              d3.select(hoverObject)
                .attr('stroke',controls.hoveredBarStroke)
                .attr('stroke-width',controls.hoveredBarStrokeWidth)
                .attr('stroke-opacity',controls.hoveredBarStrokeOpacity)
                .attr('stroke-color',controls.hoveredBarStrokeOpacity)
                .attr('cursor','pointer')
                .transition()        
                .duration(controls.animationTime)
              charts.tableToolTip.appendDetailsHtml.style('opacity',1)  

            },

            //Triger events on mouse out of hovered  stack bar         
            onBarMouseOut : function(data,barContainer,controls){// Triger Event when mouse exit bar 

              charts.tableToolTip.tooltip = barContainer.on('mouseout', function(d){  
                d3.select(this).attr('stroke','0').transition()        
                  .duration(controls.animationTime);
                d3.select(controls.target+' .message').classed('hide',true); 
              });

            }

      },

      /*******  Tooltip for single variable *******/

      singleTooltip:{

            //appends tooltip content fror single bar chart
            appendHtmlDetails : function (controls,data,d){// Appends tooltip when bar is Hovered
           
             return '<p><strong>'+d.mainCategoryName +' :</strong> ' +d.mainCategoryValue +'</p>';  

            },

            //Triger events on mouse out of hovered  single bar    
            onBarMouseOver : function(data,barContainer,controls){ // Triger Event when Bar is Hovered 

              charts.singleTooltip.tooltip = barContainer.on('mouseover', function(d){  
                  charts.tableToolTip.selectHoveredBar(this,controls);
                  var coordinates = d3.mouse(this);
                   d3.select(controls.target+' .message').html(charts.singleTooltip.appendHtmlDetails(controls,data,d))
                      .style('top', (coordinates[1] - 40) + 'px' )
                      .style('left', (coordinates[0]+ 40) + 'px')
                      .classed('hide',false); 
                  });

            },

            //Triger events on mouse leave for single bar   
             onBarMouseOut : function(data,barContainer,controls){// Triger Event when mouse exit bar 
              charts.tableToolTip.tooltip = barContainer.on('mouseout', function(d){  
                  d3.select(this).attr('stroke','0').transition()        
                     .duration(controls.animationTime);
                 
                   d3.select(controls.target+' .message').classed('hide',true); 
              });
            }


      },
     areaAssets : {

            appendCyclesOnAppex : function(data,controls,container,scaledLineXcoord,scaledLineYcoord,colorRange,tooltip){

              var  className = controls.target.substr(1);
                    container.selectAll(".point"+className)
                    .data(function (d) {  return d.values; })
                    .enter().append("circle")
                    .attr("class", "point"+className)  
                    .attr("r", "4px")
                    .style("fill", function (d) { return 'transparent'; })
                    .style("stroke", "black")
                    .style("cursor", "pointer")
                    .style("stroke-width", "0.6px")
                    .on("mouseover", function (d) {   
                  d3.select(this).transition()        
                         .duration(200).attr("r", "9px").attr("opacity", "0.7");  
                           var coordinates = d3.mouse(this);
                            Vtool.charts.commonFunctionality.areaAssets.appendTooltip(controls,coordinates,tooltip);
                            if(controls.isLineChart){
                               var html =  d.value;
                            }else{
                               var html = d.yVariable ;
                            }
                             
                           tooltip.html(html); 
                  })
                  .on("mouseout",  function (d) {  
                      d3.select(this).transition()        
                            .duration(200).attr("r", "4px").attr("opacity", "1");    
                      Vtool.charts.commonFunctionality.areaAssets.removeTooltip(controls,tooltip); })
                      Vtool.charts.commonFunctionality.areaAssets.positionCyclesOnAppex(controls,container,data,scaledLineXcoord,scaledLineYcoord);  

              },

              positionCyclesOnAppex : function(controls,container,data,scaledLineXcoord,scaledLineYcoord){
                  var  className = controls.target.substr(1);
                    container.selectAll(".point"+className).attr("cx", function (d) { 
                      if(controls.isLineChart){
                          return scaledLineXcoord(d.mainCategoryName) + scaledLineXcoord.rangeBand()/2; 
                      }else{
                          return scaledLineXcoord(d.xVariable) + scaledLineXcoord.rangeBand() / 2; 
                      }

                    })
                   .attr("cy", function (d) { 
                      if(controls.isLineChart){
                         return scaledLineYcoord(d.value); 
                      }else{
                        return scaledLineYcoord(d.y0 + d.y);
                     }
                 })

              },

                    //Appents tooltip in the right coordinates    
             appendTooltip : function(controls,coordinates,tooltip){
                d3.select(controls.target+' .message').classed('hide',false); 
                tooltip.style('opacity', 1).style("left", coordinates[0] +'px')
                  .style("top", coordinates[1]+'px');
             }, 


            //Removes tooltip   
            removeTooltip : function(controls,tooltip) {
               d3.select(controls.target+' .message').classed('hide',true); 
                tooltip.style('opacity', 0);
             },

             //Appens Title Lines   
             appendLineTitle : function(data,lineContainer,controls,scaledLineXcoord,scaledLineYcoord){
              var  className = controls.target.substr(1);
              return lineContainer.append("text")
              .attr("class", className+"text")
              .datum(function(d) { 
                  if(controls.isLineChart){
                     return {name: d.name, value: d.values[d.values.length - 1]};   }
                  else{
                    return {name: d.xVariable, value: d.values[d.values.length - 1]};
                  } })
              .attr("x", 35)
              .attr("dy", ".35em")
              .text(function(d) {   

                if(controls.isLineChart){

                   return d.name;
                }else{
                    return d.value.category;}
                })
              .style('font-size', '10px');
           
                
             },


             //Position Title Lines
             positionLineTitle : function(data,controls,scaledLineXcoord,scaledLineYcoord){
              var  className = controls.target.substr(1);
             
                   d3.selectAll('.'+className+'text').attr("transform", function(d) {
                     if(controls.isLineChart){
                         return "translate(" + scaledLineXcoord(d.value.mainCategoryName) + "," + scaledLineYcoord(d.value.value) + ")";  
                    }else{
                       return "translate(" + scaledLineXcoord(d.value.xVariable) + "," + scaledLineYcoord([(d.value.y0+d.value.y)]) + ")"; 
                    }
            })


             }, 


     }
  }

  return charts;  
}
                    
