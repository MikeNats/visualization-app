//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('areaChartController',['$scope','fetchDataFromCsvFactory',
   function($scope,fetchDataFromCsvFactory){
      $scope.chart={};
      $scope.chart.showPieSettings = false;
      $scope.chart.showgrid = true;
      $scope.chart.showAxisSettings = true;
      $scope.chart.showAreaSettings = true;
      $scope.chart.gridDivition = 30;
      fetchDataFromCsvFactory.get().then(function(response){
          $scope.chart.chartObject = Vtool.charts.area.stack;
          $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,true);     
          $scope.chart.privateSettings = $scope.chart.chartObject.init($scope.chart.fecheddata);
     });
}]); 
 





