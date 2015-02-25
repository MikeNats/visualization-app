//pieChartDirectiveModule create the directive of  pieChart tag, trigers the chart 
angular.module('chartDirectiveModule',[]).directive('dthreeChart',['chartSettngsService', function(chartSettngsService){
    function link(scope, el, attr){  
    

    /*var svg = document.getElementById('skata'),
        xml = new XMLSerializer().serializeToString(svg),
        data = "data:image/svg+xml;base64," + btoa(xml),
        img = new Image()     
        img.setAttribute('src', data)
        document.body.appendChild(img)
      */  
       
         scope.$watch('radiusdata', function(radiusdata){ //Watch radius
              if(scope.incomingdata){
                 scope.settings.innerRadius = radiusdata  ;
                 scope.modified=true;
                 scope.chart.setIneerRadius();
               }

         }); 
 
 
        scope.$watch('chartbgcolor', function(chartbgcolor){ //Watch chart bgColor
              if(scope.incomingdata){   
                scope.modified=true;
                 scope.settings.bgColor = chartbgcolor;
                Vtool.charts.commonFunctionality.setSvgBGcolor(chartbgcolor);
              }
         }); 
 

        scope.$watch('startingcolorband', function(startingcolorband){ //Watch chart bgColor
              if(scope.incomingdata){
                scope.modified=true;
                 scope.settings.lightbgColor = startingcolorband;
                 scope.chart.setColorSpectrum(scope.settings);
              }
         });  

        scope.$watch('endingcolorband', function(endingcolorband){ //Watch chart bgColor
              if(scope.incomingdata){  
              scope.modified=true; 
                 scope.settings.darkbgColor = endingcolorband;
                 scope.chart.setColorSpectrum(scope.settings);
              }
         }); 
 
         scope.$watch('lettercolor', function(lettercolor){ //Watch chart bgColor
              if(scope.incomingdata){  
              scope.modified=true; 
                 scope.settings.letterColor = lettercolor;
                 Vtool.charts.commonFunctionality.setColorOfLetters(lettercolor);
              }
         }); 

          scope.$watch('widthdimention', function(widthdimention){ //Watch chart bgColor
              if(scope.incomingdata){  
              scope.modified=true; 
                scope.settings.isResponsive = false;
                scope.settings.customWidth = widthdimention;
                 scope.chart.setCustomDimentions(scope.settings);
              } 
         });        

          scope.$watch('heightdimention', function(heightdimention){ //Watch chart bgColor
              if(scope.incomingdata){  
              scope.modified=true; 
                scope.settings.isResponsive = false;
                scope.settings.customHeight = heightdimention;
                scope.chart.setCustomDimentions(scope.settings);
              }
         });  
 
          scope.$watch('isresponsive', function(isresponsive){ //Watch chart bgColor
              if(scope.incomingdata){   
                if(!isresponsive ){
                  scope.modified=true;
                     scope.settings.isResponsive = true;
                    scope.chart.setResponsive(scope.settings);
                  } 
              }
         });  


        scope.$watch('labelangle', function(labelangle){ //Watch chart label angle
              if(scope.incomingdata){ 
              scope.modified=true;  
                     scope.settings.xAxisLabelAngle = labelangle;
                     scope.chart.setlabelXAxisLabelAngle(scope.settings);
              
              }
         }); 

            scope.$watch('xbottomaxistitle', function(xbottomaxistitle){ //Watch chart xbottom Title
              if(scope.incomingdata){ 
              scope.modified=true;  
                     scope.settings.xAxisLabelName = xbottomaxistitle;
                     Vtool.charts.commonFunctionality.xAxisFunctionality.setXAxisBottomTitleName(xbottomaxistitle);
              
              }
         }); 

        scope.$watch('yleftaxistitle', function(yleftaxistitle){ //Watch chart yleft Title
              if(scope.incomingdata){  
              scope.modified=true; 
                     scope.settings.yAxisLabelName = yleftaxistitle;
                     Vtool.charts.commonFunctionality.yAxisFunctionality.setYAxisLefttleName(yleftaxistitle);
              
              }
         });    

         scope.$watch('interpolation', function(interpolation){ //Watch chart shape interpolation
              if(scope.incomingdata){   
                scope.modified=true;
                     scope.settings.interpolation = interpolation;
                     scope.chart.setInterpolation(scope.settings);
              
              }
         });   

         scope.$watch('stacktype', function(stacktype){ //Watch chart stack type
              if(scope.incomingdata){ 
              scope.modified=true;  
                  scope.settings.stackLayout = stacktype;
                  scope.chart.staStackLayOut(scope.incomingdata,scope.settings);

              
              }
         });


        scope.$watch('gridcolor', function(gridcolor){ //Watch chart grid color
              if(scope.incomingdata){   
                scope.modified=true;
                  scope.settings.gridcolor = gridcolor;
                  Vtool.charts.commonFunctionality.gridFunctionality.styleGrid(scope.settings);              
              }
         });

          scope.$watch('gridtype', function(gridtype){ //Watch chart grid type
              if(scope.incomingdata){  
              scope.modified=true; 
                  scope.settings.gridDasharray = gridtype;
                  Vtool.charts.commonFunctionality.gridFunctionality.styleGrid(scope.settings);              
              }
         });


          scope.$watch('gridivition', function(gridivition){ //Watch chart grid type
              if(scope.incomingdata){   
                scope.modified=true;
                  scope.settings.horizontalGridTiks = gridivition;
                  scope.settings.verticalGridTiks = gridivition;
                  scope.chart.setGridSettings(scope.settings);              
              }
         });

          scope.$watch('includegrid', function(includegrid){ //Watch chart grid type
              if(scope.incomingdata){   
                scope.modified=true;
                  scope.settings.gridAppend = includegrid;
                  Vtool.charts.commonFunctionality.gridFunctionality.showHideGrid(scope.settings);              
              }
         });

          scope.$watch('axiscolor', function(axiscolor){ //Watch chart grid type
              if(scope.incomingdata){   
                scope.modified=true;
                  scope.settings.axiscolor = axiscolor;
                   Vtool.charts.commonFunctionality.xAxisFunctionality.setAxisColor( scope.settings);           
              }
         });
        
        scope.$watch('opacity', function(opacity){ //Watch chart grid type
              if(scope.incomingdata){
              scope.modified=true; 
                  scope.settings.opacity = opacity;
                  chartSettngsService.setData(scope.settings);
                  Vtool.charts.commonFunctionality.setOpacity(scope.opacity);           
              }
         });

   


    }
    return {
        link: link,
        restrict: 'E',
        scope: { 
          incomingdata: '=',
          xbottomaxistitle: '=',
          chart:'=',
          radiusdata: '=',
          chartbgcolor: '=',
          startingcolorband: '=',
          endingcolorband: '=',
          lettercolor:'=',
          widthdimention:'=',
          heightdimention: '=',
          isresponsive: '=',
          settings: '=',
          labelangle: '=',
          yleftaxistitle:'=',
          interpolation:'=',
          stacktype:'=',
          gridcolor:'=',
          gridtype:'=',
          gridivition:'=',
          includegrid:'=',
          axiscolor:'=',
          opacity:'=',
          modified:'='
         }
     };
}]) 