//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('lineChartController',['$scope','fetchDataFromCsvFactory','chartSettngsService',
   function($scope,fetchDataFromCsvFactory,chartSettngsService){
      $scope.chart={};
      $scope.chart.showPieSettings = false;
      $scope.chart.showgrid = true;
      $scope.chart.showAxisSettings = true;
      $scope.chart.showAreaSettings = true;
      $scope.chart.showGridSettings = true;
      $scope.chart.stackTypeFiled=false;
      $scope.chart.gridDivition = 21;
     fetchDataFromCsvFactory.get().then(function(response){
          $scope.chart.chartObject = Vtool.charts.line.line;
          $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,true);     
          $scope.chart.privateSettings =  chartSettngsService.data ;
          $scope.chart.privateSettings.chartType ='line';
          $scope.chart.chartType = $scope.chart.privateSettings.chartType;
          $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings);     
    
 
     });    
}]); 






