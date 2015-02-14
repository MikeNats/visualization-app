//Initialization of angulars main module and its dipendancies
var app = angular.module('app', [ 
  'ngRoute',
  'pieChartControlerModule'
]);

//Charts functions are assigned in the main app obj
app.charts = Vtool.charts; 

//Routers
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/pie', {
    templateUrl: 'views/pieChartTemplate.html',
    controller: 'pieController', 
  }).
  when('/area', {
    templateUrl: 'views/areaChartTemplate.html', 
    controller: 'areaController'
  }). 
  otherwise({
    redirectTo: '/pie' 
  }); 
}]);