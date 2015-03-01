//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('groupedBarChartController',['$scope','fetchDataFromCsvFactory','chartSettngsService',
   function($scope,fetchDataFromCsvFactory,chartSettngsService){
      $scope.chart={};
      $scope.reset={};
      $scope.chart.showPieSettings = false;
      $scope.chart.showgrid = true;
      $scope.chart.showAxisSettings = true;
      $scope.chart.showAreaSettings = false;
      $scope.chart.showGridSettings = true;
      $scope.chart.showspectrumSettings=true; 
      $scope.chart.showOrientation = true;
      $scope.chart.gridDivition = 30; 
      $scope.chart.showSort=true;
      $scope.chart.sortAxis =true;    
      fetchDataFromCsvFactory.get().then(function(response){
         $scope.chart.chartOrientation = $scope.chart.ckeckInitialOrientation(); 
         $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,true);     
         $scope.chart.privateSettings = chartSettngsService.data;
         $scope.chart.privateSettings.chartType ='grouped';
         $scope.reset.modified = $scope.chart.privateSettings.ismodified;
         $scope.chart.chartOrientation = chartSettngsService.data.chartOrientation
         $scope.chart.chartType = $scope.chart.privateSettings.chartType;
         $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings);     
     });
   
     $scope.chart.setOrientation = function(){
         $scope.chart.privateSettings.chartOrientation =  $scope.chart.ckeckOrientation();
         chartSettngsService.setData($scope.chart.privateSettings);
         angular.element(document.querySelector('#d3Chart')).remove();
         $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings); 
           console.log(chartSettngsService.data)  
      }
      $scope.chart.ckeckInitialOrientation = function(){
               if(chartSettngsService.data.chartOrientation == 'horizontal'){
                    $scope.chart.chartObject =Vtool.charts.bar.groupedHorizontal
                    return  'horizontal';         
                }else{ 
                    $scope.chart.chartObject = Vtool.charts.bar.groupedVertical;
                     return 'vertical';              
                }
      }
      $scope.chart.ckeckOrientation = function(){
               if($scope.chart.chartOrientation == 'horizontal'){
                    $scope.chart.chartObject = Vtool.charts.bar.groupedHorizontal;
                    $scope.chart.chartOrientation = 'horizontal';

                }else{
                    $scope.chart.chartObject = Vtool.charts.bar.groupedVertical;
                    $scope.chart.chartOrientation = 'vertical';
                    
                }
                 return   $scope.chart.chartOrientation;
      }

}]); 






