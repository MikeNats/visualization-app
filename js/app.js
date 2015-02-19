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
  when('/area', {
    templateUrl: 'views/chartTemplate.html', 
    controller: 'areaChartController',
  }). 
  otherwise({
    redirectTo: '/area' 
  }); 
}]);