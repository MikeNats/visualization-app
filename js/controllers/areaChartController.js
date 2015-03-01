//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('areaChartController',['$scope','fetchDataFromCsvFactory','chartSettngsService',
   function($scope,fetchDataFromCsvFactory,chartSettngsService){
      $scope.chart={};
      $scope.reset={};
             $scope.chart.showPieSettings = false;
      $scope.chart.showgrid = true;
      $scope.chart.showAxisSettings = true;
      $scope.chart.showAreaSettings = true;
      $scope.chart.showGridSettings = true;
      $scope.chart.stackTypeFiled=true;
      $scope.chart.showSort=false;
      angular.element(document.querySelector('.areaContainer:last-child')).remove();
      fetchDataFromCsvFactory.get().then(function(response){
          $scope.chart.chartObject = Vtool.charts.area.stack;
          $scope.chart.fecheddata =null;
          $scope.chart.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,true);     
          $scope.chart.privateSettings =  chartSettngsService.data;
          $scope.chart.privateSettings.chartType ='area';
          $scope.reset.modified = $scope.chart.privateSettings.ismodified;
          $scope.chart.chartType = $scope.chart.privateSettings.chartType;
          $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,$scope.chart.privateSettings);     
     });
}]); 
 





