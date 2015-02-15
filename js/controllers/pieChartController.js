//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 
angular.module('pieChartControlerModule',['pathModule', 'pieChartDirectiveModule']).controller('pieController',['$scope','pathValue',function($scope,pathValue){

  $scope.radius = 10;
  $scope.responsive = false;
   d3.csv( pathValue, function(error, data) {
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




