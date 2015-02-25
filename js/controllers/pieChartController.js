//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('pieChartController',['$scope','fetchDataFromCsvFactory','chartSettngsService',
   function($scope,fetchDataFromCsvFactory,chartSettngsService){
      $scope.chart={};
      $scope.chart.showPieSettings = true;
      $scope.chart.showAxisSettings = false;
      $scope.chart.showAreaSettings = false;
      $scope.chart.grid = false;
      $scope.chart.showGridSettings =false;

      fetchDataFromCsvFactory.get().then(function(response){
          $scope.chart.chartObject = Vtool.charts.pie.pie;
          $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,false);     
 $scope.chart.privateSettings =  chartSettngsService.data ;
          $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings);     
    
 
     });
}]); 






