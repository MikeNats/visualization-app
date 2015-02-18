//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('pieChartController',['$scope','fetchDataFromCsvFactory',
   function($scope,fetchDataFromCsvFactory){
      $scope.chart={};
      $scope.chart.showRadius = true;
      $scope.chart.showXAxisLabelAngle = false
      fetchDataFromCsvFactory.get().then(function(response){
          $scope.chart.chartObject = Vtool.charts.pie.pie;
          $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,false);     
          $scope.chart.privateSettings = $scope.chart.chartObject.init($scope.chart.fecheddata);
    
 
     });
}]); 






