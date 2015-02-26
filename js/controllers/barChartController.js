//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('barChartController',['$scope','fetchDataFromCsvFactory','chartSettngsService',
   function($scope,fetchDataFromCsvFactory,chartSettngsService){
      $scope.chart={};
      $scope.chart.showPieSettings = false;
      $scope.chart.showgrid = true;
      $scope.chart.showAxisSettings = true;
      $scope.chart.showAreaSettings = false;
      $scope.chart.showGridSettings = true;
      $scope.chart.showspectrumSettings=true;
      $scope.chart.showOrientation = true;
      $scope.chart.gridDivition = 30;
      $scope.chart.chartOrientation ='vertical';//<<<<<<<<<<<<<
      $scope.chart.showSort=true;
      fetchDataFromCsvFactory.get().then(function(response){
         $scope.chart.chartObject = Vtool.charts.bar.vertical;
         $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,false);     
         $scope.chart.privateSettings = chartSettngsService.data ;
         $scope.chart.privateSettings.chartType ='bar';
         $scope.chart.chartType = $scope.chart.privateSettings.chartType;
         $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings);     
     });
   
     $scope.chart.setOrientation = function(){
         $scope.chart.ckeckOrientation();
         angular.element(document.querySelector('#d3Chart')).remove();
         $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings);   
      }
      $scope.chart.ckeckOrientation = function(){
               if($scope.chart.chartOrientation == 'vertical'){
                    $scope.chart.chartObject = Vtool.charts.bar.vertical;
                    $scope.chart.sortYaxis =false;
                    $scope.chart.sortXaxis =true;
                }else{
                    $scope.chart.chartObject = Vtool.charts.bar.horizontal;
                    $scope.chart.sortYaxis =true;
                    $scope.chart.sortXaxis =false;                    
                }
      }

      $scope.chart.ckeckOrientation();
}]); 






