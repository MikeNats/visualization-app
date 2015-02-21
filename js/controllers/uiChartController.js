
var uiControllerModule = angular.module('chartControlerModule',['chartDirectiveModule','fetcDataFromCsvServiceFactoryModule']);

uiControllerModule.controller('uiController',['$scope',function($scope){


    $scope.accordeon={};
    $scope.tab1=true;
    $scope.tab2=true;
    $scope.tab3=true;
    $scope.tabfunc1 = function(){
           $scope.tab1 = !$scope.tab1;
           $scope.tab2 = true;
           $scope.tab3 = true;
    };
        $scope.tabfunc2 = function(){
           $scope.tab2 = !$scope.tab2;
           $scope.tab1 = true;
           $scope.tab3 = true;
    };
   
       $scope.tabfunc3 = function(){
           $scope.tab3 = !$scope.tab3;
           $scope.tab2 = true;
           $scope.tab1 = true;

    };
   
   

  $scope.chart.isResponsive = function(){ d
     var state =  function(){
        if($scope.chart.responsive){
            return false; 
        }else{
           return true;
        }
     } 
     $scope.chart.responsive =  state();
   }

   $scope.chart.isGridVisible  = function(){
     var state =  function(){
        if($scope.chart.showgrid){
            return false; 
        }else{
           return true;
        }
     } 
     $scope.chart.showgrid =  state();

   }






    $scope.chart.responsive = false;
    $scope.chart.radius = 10;
    $scope.chart.labelAngle =45;
    $scope.chart.interpolation = 'cardinal';
    $scope.chart.xBottomAxisTitle='YAxis Title.';
    $scope.chart.yLeftAxisTitle='YAxis Title.';
    $scope.chart.gridType='1,1';
    $scope.chart.stackType='zero';

}]); 


angular.module('myModule', ['ui.bootstrap']);