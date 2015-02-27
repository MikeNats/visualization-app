//Initialization of angulars main module and its dipendancies
var app = angular.module('app', [ 
  'ngRoute','ngAnimate',
  'chartControlerModule','ui.router'
]).run(
  [ '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
).config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {



      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      $urlRouterProvider
      .otherwise('/');

      //////////////////////////
      // State Configurations //
      //////////////////////////

      $stateProvider
        // Home //
        .state("index", {
          // Use a url of "/" to set a state as the "index".
          url: "/",
          templateUrl: 'views/indexTemplate.html', 
 
        })
        // charts // 
        .state('charts', {
          url: '/charts',
          templateUrl: 'views/chartsTemplate.html', 
          controller: 'chartsController',
              
        })
        // select //
        .state('select', {
          url: '/charts/select',
          templateUrl: 'views/selectChartsTemplate.html', 
          controller: 'selectChartController',
              
        })
        // area //
        .state('area', {
          url: '/charts/select/area',
          templateUrl: 'views/chartTemplate.html', 
          controller: 'areaChartController',         
        })
        // pie //
        .state('pie', {
          url: '/charts/select/pie',
          templateUrl: 'views/chartTemplate.html', 
          controller: 'pieChartController',
              
        })
        // line //
        .state('line', {
          url: '/charts/select/line',
          templateUrl: 'views/chartTemplate.html', 
          controller: 'lineChartController',
              
        })
        // Bar //
        .state('bar', {
          url: '/charts/select/bar',
          templateUrl: 'views/chartTemplate.html', 
          controller: 'barChartController',    
        })
        .state('grouped', {
          url: '/charts/select/grouped', 
          templateUrl: 'views/chartTemplate.html', 
          controller: 'groupedBarChartController', 
              
      })
    }]);


