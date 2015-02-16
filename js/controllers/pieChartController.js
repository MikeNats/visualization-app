//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 
 

angular.module('pieChartControlerModule',['pieChartDirectiveModule','fetcDataFromCsvServiceFactoryModule',]).controller('pieController',['$scope','fetchDataFromCsvFactory',
   function($scope,fetchDataFromCsvFactory){


 $scope.responsive = false;
  $scope.radius = 10;
  fetchDataFromCsvFactory.get().then(function(response){
        $scope.chartObject = Vtool.charts.pie.pie;
        $scope.fecheddata = Vtool.charts.commonFunctionality.secureCSVData(response,false);    
       
        $scope.privateSettings = $scope.chartObject.init($scope.fecheddata);
   
   });
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









