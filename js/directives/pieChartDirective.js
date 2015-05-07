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

         scope.$watch('settings', function(settings){ //Watch radius
              if(scope.incomingdata){
                  scope.radiusdata = scope.settings.innerRadius;   
                  scope.chartbgcolor = scope.settings.bgColor;
                  scope.startingcolorband = scope.settings.lightbgColor;
                  scope.endingcolorband =  scope.settings.darkbgColor;
                  scope.lettercolor =  scope.settings.letterColor;
                  scope.labelangle = scope.settings.xAxisLabelAngle;
                  scope.yleftaxistitle = scope.settings.yAxisLabelName;
                  scope.interpolation = scope.settings.interpolation;
                  scope.stacktype = scope.settings.stackLayout;
                  scope.gridcolor = scope.settings.gridcolor;
                  scope.gridtype = scope.settings.gridDasharray;  
                  scope.isresponsive = scope.settings.isResponsive;
                  if(!scope.isresponsive ){
                     scope.widthdimention = scope.settings.customWidth;
                     scope.heightdimention = scope.settings.customHeight;
                     scope.chart.setCustomDimentions(scope.settings);
                  }
                  scope.gridivition = scope.settings.horizontalGridTiks;
                  scope.includegrid =  scope.settings.gridAppend;
                  scope.axiscolor = scope.settings.axiscolor;
                  scope.opacity = scope.settings.opacity;
                  scope.xbottomaxistitle = scope.settings.xAxisLabelName;
     
               }

         });

         scope.$watch('radiusdata', function(radiusdata){ //Watch radius
              if(scope.incomingdata){
                if(scope.settings.chartType =='pie'){
                   scope.settings.innerRadius = radiusdata;
                   scope.chart.setIneerRadius();
                 }
               }

         }); 
 
        scope.$watch('chartbgcolor', function(chartbgcolor){ //Watch chart bgColor
              if(scope.incomingdata){   
                 scope.settings.bgColor = chartbgcolor;
                 Vtool.charts.commonFunctionality.setSvgBGcolor(chartbgcolor);
              }
         }); 
        
        scope.$watch('modified',function(modified){
            if(scope.incomingdata){
               $scope.chart.privateSettings.ismodified=scope.modified; 
            }


        });

        scope.$watch('startingcolorband', function(startingcolorband){ //Watch chart bgColor
              if(scope.incomingdata){
                 scope.settings.lightbgColor = startingcolorband;
                 scope.chart.setColorSpectrum(scope.settings);
              }
         });  

        scope.$watch('endingcolorband', function(endingcolorband){ //Watch chart bgColor
              if(scope.incomingdata){  
                 scope.settings.darkbgColor = endingcolorband;
                 scope.chart.setColorSpectrum(scope.settings);
              }
         }); 
 
         scope.$watch('lettercolor', function(lettercolor){ //Watch chart bgColor
              if(scope.incomingdata){  
                 scope.settings.letterColor = lettercolor;
                 Vtool.charts.commonFunctionality.setColorOfLetters(lettercolor);
              }
         }); 

          scope.$watch('widthdimention', function(widthdimention){ //Watch chart bgColor
              if(scope.incomingdata){  
                scope.settings.isResponsive = false;
                scope.settings.customWidth = widthdimention;
                scope.chart.setCustomDimentions(scope.settings);
              } 
         });        

          scope.$watch('heightdimention', function(heightdimention){ //Watch chart bgColor
              if(scope.incomingdata){  
                scope.settings.isResponsive = false;
                scope.settings.customHeight = heightdimention;
                scope.chart.setCustomDimentions(scope.settings);
              }
         });  
 
          scope.$watch('isresponsive', function(isresponsive){ //Watch chart bgColor
              if(scope.incomingdata){   
                if(isresponsive ){
                     scope.settings.isResponsive = true;
                    scope.chart.setResponsive(scope.settings);
                  } 
              }
         });  

        scope.$watch('labelangle', function(labelangle){ //Watch chart label angle
              if(scope.incomingdata){ 
                   if(scope.settings.chartType !='pie'){ 
                     scope.settings.xAxisLabelAngle = labelangle;
                     scope.chart.setlabelXAxisLabelAngle(scope.settings);
                   }
              
              }
         }); 

         scope.$watch('xbottomaxistitle', function(xbottomaxistitle){ //Watch chart xbottom Title
              if(scope.incomingdata){
                  if(scope.settings.chartType !='pie'){ 
                     scope.settings.xAxisLabelName = xbottomaxistitle;
                     Vtool.charts.commonFunctionality.xAxisFunctionality.setXAxisBottomTitleName(xbottomaxistitle);
                  }
              }
         }); 

        scope.$watch('yleftaxistitle', function(yleftaxistitle){ //Watch chart yleft Title
              if(scope.incomingdata){  
                if(scope.settings.chartType !='pie'){
                     scope.settings.yAxisLabelName = yleftaxistitle;
                     Vtool.charts.commonFunctionality.yAxisFunctionality.setYAxisLefttleName(yleftaxistitle);  
                }     
              }
         });    

         scope.$watch('interpolation', function(interpolation){ //Watch chart shape interpolation
              if(scope.incomingdata){
                if(scope.settings.chartType =='area' || scope.settings.chartType =='line'){ 
                     scope.settings.interpolation = interpolation;
                     scope.chart.setInterpolation(scope.settings); 
                }
              }
         });   

         scope.$watch('stacktype', function(stacktype){ //Watch chart stack type
              if(scope.incomingdata){  
                if(scope.settings.chartType=='area'){
                  scope.settings.stackLayout = stacktype;
                  scope.chart.staStackLayOut(scope.incomingdata,scope.settings);
                }
              }
         });

        scope.$watch('gridcolor', function(gridcolor){ //Watch chart grid color
              if(scope.incomingdata){
               if(scope.settings.chartType !='pie'){   
                  scope.settings.gridcolor = gridcolor;
                  Vtool.charts.commonFunctionality.gridFunctionality.styleGrid(scope.settings);
                }              
              }
         });

          scope.$watch('gridtype', function(gridtype){ //Watch chart grid type
              if(scope.incomingdata){  
                 if(scope.settings.chartType !='pie'){
                  scope.settings.gridDasharray = gridtype;
                  Vtool.charts.commonFunctionality.gridFunctionality.styleGrid(scope.settings); 
                }            
              }
         });


          scope.$watch('gridivition', function(gridivition){ //Watch chart grid type
              if(scope.incomingdata){   
                 if(scope.settings.chartType !='pie'){
                    scope.settings.horizontalGridTiks = gridivition;
                    scope.settings.verticalGridTiks = gridivition;
                    scope.chart.setGridSettings(scope.settings);   
                  }           
              }
         });

          scope.$watch('includegrid', function(includegrid){ //Watch chart grid type
              if(scope.incomingdata){  
                if(scope.settings.chartType !='pie'){ 
                  scope.settings.gridAppend = includegrid;
                  Vtool.charts.commonFunctionality.gridFunctionality.showHideGrid(scope.settings); 
                }             
              }
         });

          scope.$watch('axiscolor', function(axiscolor){ //Watch chart grid type
              if(scope.incomingdata){  
                 if(scope.settings.chartType!='pie'){ 
                    scope.settings.axiscolor = axiscolor;
                     Vtool.charts.commonFunctionality.xAxisFunctionality.setAxisColor( scope.settings);           
                  }
              }
         });
        
        scope.$watch('opacity', function(opacity){ //Watch chart grid type
              if(scope.incomingdata){
                  scope.settings.opacity = opacity;
                  chartSettngsService.setData(scope.settings);
                  Vtool.charts.commonFunctionality.setOpacity(scope.opacity);
                             

              }
         });
        scope.$watch('shortinput', function(shortinput){
             if(scope.incomingdata){
                scope.settings =  Vtool.charts.commonFunctionality.sortDataFunctionality.setUserShortChoice(scope.settings,shortinput);
               
                scope.chart.shortAxis(scope.settings,scope.incomingdata);
               // angular.element(document.querySelector('#d3Chart')).remove();
              //  scope.chart.exeUserSettings(scope.incomingdata,scope.settings);
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
          modified:'=',
          shortinput:'='
         }
     };
}]) 