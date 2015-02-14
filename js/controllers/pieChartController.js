//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 
angular.module('pieChartControlerModule',['pieChartDirectiveModule']).controller('pieController',['$scope',function($scope){

  $scope.radius = 10;
  $scope.responsive = false;

   d3.csv('./csv/pie/pie/data.csv', function(error, data) {
      if(!error){
          $scope.pieDataVar = app.charts.commonFunctionality.secureCSVData(data,false);
          $scope.$apply();
          app.charts.pie.pie.init($scope.pieDataVar);
          $scope.privateSettings = app.charts.pie.pie.getSettings();
      }else{
          throw error;  
      } 
   }); 

  $scope.isResponsive = function(){
     if($scope.responsive){
       $scope.responsive = false
     }else{
       $scope.responsive = true
     }
     

  }

}]);




