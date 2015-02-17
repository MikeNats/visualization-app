
angular.module('fetcDataFromCsvServiceFactoryModule',['pathModule']).factory('fetchDataFromCsvFactory',['$http','pathValue', function($http,pathValue){
   
    return {
        get : function(){
            return   $http.get(pathValue).then(function(response) {  
                         var fetchedString =  JSON.stringify(response.data);
                       fetchedString  =   fetchedString.replace('"','').replace('"','').replace(' ','').replace(/\\r/g,'').replace(/\\n/g,"NEWROW");
                       var numberOfColumns = fetchedString.match(/NEWROW/gi).length;// number of rows
                       var catergoriesNames = fetchedString.substr(0, fetchedString.indexOf('NEWROW'));//names of the categories   
                       var arrayOfRows = catergoriesNames.split(',')
                       var arrayOfColumns = fetchedString.replace(catergoriesNames,'')
                       arrayOfColumns = arrayOfColumns.slice(6).split('NEWROW');
                       for(i=0;i<numberOfColumns;i++){
                            arrayOfColumns[i] = arrayOfColumns[i].split(',');
                       }
                       var incomingData = {};
                       var incomingDataArray = [];
                       for(column=0;column<arrayOfColumns.length;column++){               
                          for(row=0;row<arrayOfRows.length;row++){     
                                incomingData[arrayOfRows[row]]  =  arrayOfColumns[column][row]; 
                          }
                          incomingDataArray.push(incomingData);
                          incomingData = {};                 
                       }

                      return incomingDataArray;  
                }); 
        }
    }
}]); 
