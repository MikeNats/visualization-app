//pieChartDirectiveModule create the directive of  pieChart tag, trigers the chart 
angular.module('chartDirectiveModule',[]).directive('dthreeChart',function(){
    function link(scope, el, attr){  
      

         scope.$watch('radiusdata', function(radiusdata){ //Watch radius
              if(scope.incomingdata){
                 scope.settings.innerRadius = radiusdata  ;
                 scope.chart.setIneerRadius();
                 var svg = document.getElementById('skata'),
xml = new XMLSerializer().serializeToString(svg),
data = "data:image/svg+xml;base64," + btoa(xml),
img = new Image()
 
img.setAttribute('src', data)
document.body.appendChild(img)

              }
         }); 
 
 
        scope.$watch('chartbgcolor', function(chartbgcolor){ //Watch chart bgColor
              if(scope.incomingdata){   
                 scope.chart.setSvgBGcolor(chartbgcolor);
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
                 scope.settings.letter = lettercolor;
                 scope.chart.setColorOfLetters(lettercolor);
              }
         }); 

          scope.$watch('widthdimention', function(widthdimention){ //Watch chart bgColor
              if(scope.incomingdata){   
                scope.settings.isResponsive = false;
                scope.settings.customWidth = widthdimention;
                 scope.chart.customDimentions(scope.settings);
              } 
         });        

          scope.$watch('heightdimention', function(heightdimention){ //Watch chart bgColor
              if(scope.incomingdata){   
                scope.settings.isResponsive = false;
                scope.settings.customHeight = heightdimention;
                scope.chart.customDimentions(scope.settings);
              }
         });  
 
          scope.$watch('isresponsive', function(isresponsive){ //Watch chart bgColor
              if(scope.incomingdata){   
                if(!isresponsive ){
                     scope.settings.isResponsive = true;
                    scope.chart.setResponsive(scope.settings);
                  } 
              }
         });  


        scope.$watch('labelangle', function(labelangle){ //Watch chart label angle
              if(scope.incomingdata){   
              
                     scope.settings.xAxisLabelAngle = labelangle;
                     console.log('skata');
                     scope.chart.setlabelXAxisLabelAngle(scope.settings);
              
              }
         }); 



          

    }
    return {
        link: link,
        restrict: 'E',
        scope: { 
          incomingdata: '=',
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
          labelangle: '='
         }
     };
}) 