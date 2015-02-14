//pieChartDirectiveModule create the directive of  pieChart tag, trigers the chart 
angular.module('pieChartDirectiveModule',[]).directive('pieChart',function(){
    function link(scope, el, attr){  


         scope.$watch('radiusdata', function(radiusdata){ //Watch radius
              if(scope.piedata){
                 scope.settings.innerRadius = radiusdata  ;
                 app.charts.pie.pie.setIneerRadius();
              }
         }); 

 
        scope.$watch('chartbgcolor', function(chartbgcolor){ //Watch chart bgColor
              if(scope.piedata){   
                 app.charts.pie.pie.setSvgBGcolor(chartbgcolor);
              }
         }); 
 

        scope.$watch('startingcolorband', function(startingcolorband){ //Watch chart bgColor
              if(scope.piedata){  
                 scope.settings.lightbgColor = startingcolorband;
                 app.charts.pie.pie.setColorSpectrum(scope.settings);
              }
         });  

        scope.$watch('endingcolorband', function(endingcolorband){ //Watch chart bgColor
              if(scope.piedata){   
                 scope.settings.darkbgColor = endingcolorband;
                 app.charts.pie.pie.setColorSpectrum(scope.settings);
              }
         }); 
 
         scope.$watch('lettercolor', function(lettercolor){ //Watch chart bgColor
              if(scope.piedata){   
                 scope.settings.letter = lettercolor;
                 app.charts.pie.pie.setColorOfLetters(lettercolor);
              }
         }); 

          scope.$watch('widthdimention', function(widthdimention){ //Watch chart bgColor
              if(scope.piedata){   
                scope.settings.isResponsive = false;
                scope.settings.customWidth = widthdimention;
                 app.charts.pie.pie.customDimentions(scope.settings);
              }
         });        

          scope.$watch('heightdimention', function(heightdimention){ //Watch chart bgColor
              if(scope.piedata){   
                scope.settings.isResponsive = false;
                scope.settings.customHeight = heightdimention;
                 app.charts.pie.pie.customDimentions(scope.settings);
              }
         });  
 
          scope.$watch('isresponsive', function(isresponsive){ //Watch chart bgColor
              if(scope.piedata){   
                if(!isresponsive ){
                     scope.settings.isResponsive = true;
                    app.charts.pie.pie.setResponsive(scope.settings);
                  } 
              }
         });  

    }
    return {
        link: link,
        restrict: 'E',
        scope: { 
          piedata: '=',
          radiusdata: '=',
          chartbgcolor: '=',
          startingcolorband: '=',
          endingcolorband: '=',
          lettercolor:'=',
          widthdimention:'=',
          heightdimention: '=',
          isresponsive: '=',
          settings: '='
         }
     };
}) 