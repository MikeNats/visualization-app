/** 
  * Pie - Donut D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Team.
*/ 



function createPieChart( ){

       var chart = {};

        chart.colorBoxRange = [], 
        chart.value = [],
        chart.categoryName = [],


        //Initizlize arc for our main pie
        chart.initializeArcObject = function(){
            chart.arcObjc = d3.svg.arc()
                .outerRadius(chart.outerRadius)
                .innerRadius(chart.controls.innerRadius);

        },


        //Initizlize arc for our labels
        chart.initializeArcObjectText = function(data){
            chart.arcObjcText = d3.svg.arc()
                .outerRadius(chart.outerRadius * 2.5)
                .innerRadius(0);
        },


        //Initizlize arc for our lineIndicators
        chart.initializeArcObjectLines = function(){
            chart.arcObjcLine = d3.svg.arc()
                .outerRadius(chart.outerRadius)
                .innerRadius(0);
        },

        //Initialize pie
        chart.InitializePieObject  = function(){
            chart.pieObject = d3.layout.pie()
                .value(function (d) {
                  return d.mainCategoryValue;
            });
           
        },


         //Ajax call from given url
        chart.fetchData = function() {
          d3.csv(chart.controls.url, function(error, data) {
              chart.incomingData = Vtool.charts.commonFunctionality.secureCSVData(data,chart.controls.hasSubcategories);
              
              chart.dataIsFetched(chart.incomingData);
                    
                 
            });
          },


        //maps data by brakeing them down into 2  tables
        chart.mapVariables = function(data){
            chart.incomingData.forEach(function (d) {
              d.mainCategoryValue=+d.mainCategoryValue
               chart.value.push(d.mainCategoryValue);
               chart.categoryName.push(d.mainCategoryName)
            });
        },


        //Min - Max  Values
        chart.carlulateMinMaxInputValues = function(data){
           
            chart.max = d3.max( chart.value );
            chart.min = d3.min( chart.value);
        },


        //Appends append Arc Container
        chart.appendArcContainer = function(){
           chart.className = chart.controls.target.substr(1);
            chart.arcsContainer = chart.svg.append("g")
                .attr("class",  "chartContainer");

        },
    

        //append Pie Chart Arcs
        chart.appendPieChartArcs = function(){
         
             chart.arcs = chart.arcsContainer.selectAll(".arc")
                .data(chart.pieObject(chart.incomingData))
                .enter()
                .append("g")
                .attr("class", function(d,i){  
                    return  chart.className+"arc"+i;
                })
                .style("cursor",'pointer');
        },

        //positions Pie Chart Arcs
        chart.positionPieChartArcs = function(){
            chart.arcs.data(chart.pieObject(chart.incomingData))
        }, 

        //append  and positions BgColor To Arcs
        chart.appendBgColorToArcs = function(){
            chart.colorArea  =  chart.arcs.append("path");
            chart.positionBgColorToArc();
               
        },

        //position Bg Color To Arc
        chart.positionBgColorToArc = function(){
                chart.colorArea.attr("d",chart.arcObjc).transition().duration(500)
                .attr("fill", function (d) {
                  return chart.colorRange(d.data.mainCategoryName);               
            });

        },

        //appends details into the pies
        chart.appendDetails =  function(){
            chart.details = chart.arcs.append("svg:text") 
                .attr("text-anchor", "middle")                     
                .text(function(d, i) {     
                    chart.persentage = Math.floor(( chart.value[i]*100 ) / chart.sumOfInputData(chart.value) );
                
                    return chart.persentage + '%';  
                })
                .style("color","#fff");
            chart.positionDetails();
        },


        //returns the circumference
        chart.circumference = function(){    
           return Math.PI * 2 * chart.outerRadius;
        },

        // returns the sum of the input table
        chart.sumOfInputData =  function(input){
            var total = 0;
            for (var i=0;i<input.length;i++) {
                    total += input[i];
            }

            return total;
         },

         //Positions details into pie
        chart.positionDetails = function(){
            chart.details.transition().duration(200).attr("transform", function(d) {                   
                     d.innerRadius = chart.controls.innerRadius * 2;
                     d.outerRadius = chart.outerRadius * 2;
                    return "translate(" +  chart.arcObjcText.centroid(d) + ")";        
                })

        },

        //appends the lines
        chart.appendLines = function(){
            chart.lines = chart.arcs.append("path")
            .attr("class",    chart.className+"pointer")
            .style("fill", "none")
            .style("stroke", "black")
            .attr("marker-end", "url(#circ)")
          
            chart.positionLines();
        },


        //positions the lines
        chart.positionLines = function(){
            chart.lines.attr("d", function(d,i) {
                d.mainCategoryValue =+ d.data.mainCategoryValue
                   var startingSetOfPoints = chart.arcObjcLine.centroid(d);
                   var endingSetOfPoints = chart.arcObjcText.centroid(d)
                    return "M" + startingSetOfPoints[0]*2+   "," + startingSetOfPoints[1]*2    + "L" + endingSetOfPoints[0] / 1.16 +"," + endingSetOfPoints[1]/ 1.16;     
            }).attr('class','line'); 
        },


        //Hover animatioins 
        chart.onHoverAnimation = function(){
            chart.colorArea.on("mouseover", function (d) {
                d3.select(this).transition().duration(200)
                .attr('stroke','red').attr('stroke-width','0.5');

                 var currentHoveredClass = d3.select(this.parentNode).attr('class');
                 var numberOfClass = currentHoveredClass.substr(currentHoveredClass.length - 1);
                 d3.select('.legent.legent'+numberOfClass+' rect').transition().duration(200).attr('stroke','red').attr('stroke-width','0.4');
                d3.selectAll(chart.controls.target +' .tableContainer .'+currentHoveredClass).style('backgroundColor','#ccc');
            });
            chart.colorArea.on("mouseout", function (d, i) {
                d3.select(this).transition().duration(200)
                   .attr('stroke','none');
                    var currentHoveredClass = d3.select(this.parentNode).attr('class');
                     var numberOfClass = currentHoveredClass.substr(currentHoveredClass.length - 1);
                 d3.select('.legent.legent'+numberOfClass+' rect').transition().duration(200).attr('stroke','none');
                d3.selectAll(chart.controls.target +' .tableContainer .'+currentHoveredClass).style('backgroundColor','#eee');
            });
        },


        //Centers the pie
        chart.centerCycle = function(){
            if(chart.controls.isResponsive){
                d3.select('.chartContainer').attr("transform", "translate("+  ( ( d3.select(window)[0][0].innerWidth/2) - chart.controls.marginLeft() ) +","+ ( (d3.select(window)[0][0].innerHeight/2) - chart.controls.marginTop() )+")")
            }else{

                d3.select('.chartContainer').attr("transform", "translate("+  ( ( chart.controls.customWidth/2.5) - chart.controls.marginLeft() ) +","+ ( (chart.controls.customHeight/2) - chart.controls.marginTop() )+")")

            }
        },

  
         //Responsive  function is trigered on  resize  
        chart.resize = function(){
          d3.select(window).on('resize.pie'+chart.className, chart.responsive); 
        },


        //setts outer radius
        chart.setOuterRadius = function(){
            if(chart.controls.isResponsive){
                if(d3.select(window)[0][0].innerWidth > d3.select(window)[0][0].innerHeight){
                     if(d3.select(window)[0][0].innerHeight <= chart.controls.mobileViewPort ){     
                         chart.outerRadius = d3.select(window)[0][0].innerHeight/4;
                     }else{
                          chart.outerRadius = d3.select(window)[0][0].innerHeight/3;
                     }
                }else{
                     if(d3.select(window)[0][0].innerWidth <= chart.controls.mobileViewPort ){
                         chart.outerRadius = d3.select(window)[0][0].innerWidth/4;
                     }else{
                        chart.outerRadius = d3.select(window)[0][0].innerWidth/3;
                     }
                }
            }else{         
                    chart.outerRadius = chart.controls.customHeight/3
            }   

        },

        //initializes arcs
        chart.scaleValues = function(){
                chart.initializeArcObject();
                chart.initializeArcObjectText();
                chart.initializeArcObjectLines();
        },

            // chain of functions for responsive implementation   
        chart.responsive = function(){
            chart.controls.viewPortWidth = Vtool.charts.commonFunctionality.responsiveFunctionality.checkViewPortWidth();
              d3.select('svg').attr('height', (d3.select(window)[0][0].innerHeight-5) ) ;
            chart.setOuterRadius();
            chart.initializeArcObject();
            chart.initializeArcObjectText();
            chart.initializeArcObjectLines();
            chart.positionBgColorToArc();
            chart.positionDetails();
            chart.positionLines();
            chart.centerCycle();
            chart.resetDimentionsOfContentTable();

        },

        chart.resetDimentionsOfContentTable = function(){

           var transform =  d3.select(chart.controls.target+' .chartContainer').attr('transform');
           transform = transform.substr(0, transform.indexOf(','));
           transform = transform.replace(/\(/gi, "");//remove all ]
           transform = transform.replace('translate', "");//remove all ]

           if(chart.controls.isResponsive){
                d3.select(chart.controls.target+' .tableContainer').attr('transform',"translate("+ (+transform *1.8) +",10)" );
          }else{
                d3.select(chart.controls.target+' .tableContainer').attr('transform',"translate("+ (+transform *2.3) +",10)" );
          }  

      
        },
        chart.dataIsFetched = function(data){
                
                Vtool.charts.commonFunctionality.sortDataFunctionality.shortData(data,chart.controls);

                chart.mapVariables(data);

                chart.carlulateMinMaxInputValues(data);

                chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(chart.categoryName,chart.controls);
          
                chart.appendArcContainer();
          
                chart.InitializePieObject();
               
                chart.appendPieChartArcs();

                chart.contentTable =  Vtool.charts.commonFunctionality.tableFunctionality.appendTable(chart.controls,data,chart.colorRange,chart.categoryName)
               
                chart.appendBgColorToArcs();
     
                chart.appendDetails();
      
                chart.appendLines();
                 
 
                chart.onHoverAnimation();
             
                chart.centerCycle();  
               

                if(chart.controls.isResponsive){ 
                    chart.resize(data);
                }

                chart.resetDimentionsOfContentTable();

        },



        //Chain of functions that build the chart
         chart.appendChart = function(data){
            chart.setOuterRadius();
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
            chart.controls.contentTableShow = true;
            chart.controls.hasSubcategories = false;
            chart.controls.isPersentage = false;
            chart.controls.target = 'pie-Chart';
        },


         //Executes the chart
         chart.exe = function(data){
            chart.incomingData = data;
            chart.cerateLocalSettings();
            chart.overrideLocalSettings ();            
            chart.appendChart(data);
         }

        //Executes the chart insideIframe
        chart.exeFromIframe = function(data,controls){
            chart.controls = controls;
            chart.incomingData = data;
            chart.overrideLocalSettings ();            
            chart.appendChart(data);
         }


        //Object Chart returns init and local settings
         return{
            init : function(data){
                chart.exe(data);
             },
            initFromIframe : function(data,controls){
                chart.exeFromIframe(data,controls);
             },
             getSettings : function(){
                return chart.controls;
             },
             setIneerRadius : function(){
                chart.initializeArcObject();
                chart.positionBgColorToArc();
             },
             setSvgBGcolor : function(data){
                d3.select('svg').style('background', data);
            },
            setColorSpectrum : function(controls){
                chart.colorRange =  Vtool.charts.commonFunctionality.colorFunctionality.scaleColorSecturm(chart.categoryName,controls);
                chart.positionBgColorToArc();
                d3.selectAll('.tableRect').style("fill", function(d,i){
                       return chart.colorRange(chart.categoryName[i]);
                  });
            },
            setColorOfLetters: function(color){
                    d3.select('svg').style('fill', color);
                    d3.selectAll('.line').style('stroke', color);
            },
            customDimentions : function(controls){
                  d3.select(controls.target+' svg').attr('width',controls.customWidth).attr('height',controls.customHeight);
                  chart.setOuterRadius();
                  chart.initializeArcObject();
                  chart.initializeArcObjectText();
                  chart.initializeArcObjectLines();
                  chart.positionBgColorToArc();
                  chart.positionDetails();
                  chart.positionLines();
                  chart.centerCycle();
                  chart.resetDimentionsOfContentTable();
            },
            setResponsive : function(controls){
              chart.controls = controls
              d3.select(controls.target+' svg').attr('width','100%')
              chart.responsive(); 
            }

        }

 }  







