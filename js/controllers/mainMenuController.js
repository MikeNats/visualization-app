

uiControllerModule.controller('mainMenuController',['$scope',function($scope){
  $scope.menu={};
  $scope.menu.maps = false; 
  $scope.menu.charts = false;

  console.log('skata')
  $scope.menu.mapsSelected = function(){
    $scope.menu.maps = true; 
    $scope.menu.charts = false;
  }

  $scope.menu.chartsSelected = function(){
    $scope.menu.maps = false; 
    $scope.menu.charts = true;
  }

  
}]);  