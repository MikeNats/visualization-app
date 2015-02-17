
var uiControllerModule = angular.module('chartControlerModule',['chartDirectiveModule','fetcDataFromCsvServiceFactoryModule']);

uiControllerModule.controller('uiController',['$scope',function($scope){


  $scope.chart.responsive = false;
  $scope.chart.radius = 10;
  $scope.chart.isResponsive = function(){ 
     var state =  function(){
        if($scope.chart.responsive){
            return false; 
        }else{
           return true;
        }
     } 
     $scope.chart.responsive =  state();
   }

}]); 