//Pie chart controller.Has a dependancy, the  pieChartDirectiveModule module. PieChartControlerModule fetch the data from the given url attache them in the global scope  and trigers the pieChartDirectiveModule 

uiControllerModule.controller('selectChartController',['$scope',
   function($scope){
    $scope.chart={};
    $scope.chart.selected=false;

    $scope.chart.select = function($event){
     
       if(!angular.element($event.currentTarget).hasClass('selected') ){
            var currItem = '.'+angular.element($event.currentTarget).attr('id');

            angular.element(document.querySelectorAll('li')).removeClass('selected');
            angular.element(document.querySelectorAll('div')).removeClass('selected'); 
            angular.element($event.currentTarget).addClass('selected');
            angular.element(document.querySelector(currItem)).addClass('selected');
        }
    };

}]); 






