//Initialization of angulars main module and its dipendancies
var app = angular.module('app', [ 
  'ngRoute',
  'pieChartControlerModule'
]);


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