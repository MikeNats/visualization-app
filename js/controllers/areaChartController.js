//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('areaChartController',['$scope','fetchDataFromCsvFactory',
   function($scope,fetchDataFromCsvFactory){
      $scope.chart={};
      $scope.chart.showRadius = false;
      $scope.chart.showXAxisLabelAngle =true;
      fetchDataFromCsvFactory.get().then(function(response){
          $scope.chart.chartObject = Vtool.charts.area.stack;
          $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,false);     
          $scope.chart.privateSettings = $scope.chart.chartObject.init($scope.chart.fecheddata);
     });
}]); 
 





