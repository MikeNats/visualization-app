angular.module('settingsProviderModule', []).factory('chartSettngsService',function(){
   
          var settings ={};
          settings.data = Object.create(Vtool.charts.settings) ;
          settings.setData = function(data){
            settings.data  = data;
          }
          settings.resetData = function(){
            settings.data  = Object.create(Vtool.charts.settings) ;
          }

    return settings;

});

//settingsProviderModule.config(['chartSettngsServiceProvider'], function( chartSettngsServiceProvider ) {
 //   chartSettngsServiceProvider.setSettings(Vtool.charts.settings);
   // console.log(chartSettngsServiceProvider.chartSettings);
//});