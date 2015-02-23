
var uiControllerModule = angular.module('chartControlerModule',['chartDirectiveModule','fetcDataFromCsvServiceFactoryModule']);

uiControllerModule.controller('uiController',['$scope',function($scope){

//Accordeon
    $scope.accordeon={};
    $scope.accordeon.activeTab = function($event){
        if(angular.element($event.currentTarget).parent().hasClass('colapse') ){
            angular.element($event.currentTarget).parent().removeClass('colapse');
        }else{
           angular.element(document.querySelectorAll('.accTitle')).removeClass('colapse');         
           angular.element($event.currentTarget).parent().addClass('colapse');

        }

    };
   
   

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