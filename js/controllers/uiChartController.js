angular.module('uiChartControlerModule',[]).controller('uiChartController',['$scope',function($scope){


    $scope.responsive = false;
    $scope.radius = 10;
     $scope.isResponsive = function(){
       var state =  function(){
          if($scope.responsive){
              return false;
          }else{
             return true;
          }
       } 
       $scope.responsive =  state();
     }

}]); 




