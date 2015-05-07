var uiControllerModule = angular.module('chartControlerModule',[
  'chartDirectiveModule',
  'fetcDataFromCsvServiceFactoryModule',
  'settingsProviderModule']);

uiControllerModule.controller('uiController',
  ['$scope',
   'chartSettngsService',
   '$location',
   function($scope,chartSettngsService,$location){
   
  $scope.chart.showspectrumSettings=true;
    
    $scope.reset = {};
   $scope.reset.modified = false;
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
  //Show/hide widh/height attributes 
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

   //Show/Hide grid filed
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

//show reset button
  $scope.reset.settingModified = function(){ 
     $scope.reset.modified = true;
  }
//Resets chart settings;
  $scope.reset.resetSettings = function(){

        chartSettngsService.resetData();
        angular.element(document.querySelector('#d3Chart')).remove();
        $scope.chart.chartObject.exeUserSettings($scope.chart.fecheddata,chartSettngsService.data);
        $scope.chart.privateSettings = chartSettngsService.data;
          $scope.reset.modified = false;   
  }


$scope.chart.changeChart = function(view){
 
      if(view == 'pie'){
         $location.path('/charts/select/pie');
      }else if(view == 'area'  ){
         $location.path('/charts/select/area');
      }else if(view == 'bar'){
        $location.path('/charts/select/bar');
      }else if(view == 'line'){
          $location.path('/charts/select/line');
       }else if(view == 'stack'){
          $location.path('/charts/select/stack');   
      }else if(view == 'grouped'){
          $location.path('/charts/select/grouped'); 
      }
}

}]); 







angular.module('myModule', ['ui.bootstrap']);