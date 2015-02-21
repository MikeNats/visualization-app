//Initialization of angulars main module and its dipendancies
var app = angular.module('app', [ 
  'ngRoute',
  'chartControlerModule'
]);


//Routers
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/pie', {
    templateUrl: 'views/chartTemplate.html', 
    controller: 'pieChartController',  
  }).
  when('/charts', {
    templateUrl: 'views/chartsTemplate.html', 
    controller: 'chartsController',
  }).
  when('/charts/select', {
    templateUrl: 'views/selectChartsTemplate.html', 
    controller: 'selectChartController',
  }). 
  when('/charts/select/area', {
    templateUrl: 'views/chartTemplate.html', 
    controller: 'areaChartController',
  }). 
  otherwise({
    redirectTo: '/index',
    templateUrl: 'views/indexTemplate.html' 
  }); 
}]);