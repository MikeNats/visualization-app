
(function(googleMarkersApp) { 
   //app settings
   googleMarkersApp.settings = {
      map: null, 
      response: null,
      typeOfAction: 'exe',
      currentCategory: null,
      mapLang:'54.3981628',
      mapLong:'-4.116037',
      zoom:'6',
      layer: '',
      dim:20,
      markers: [],
      data:{
        categoryName:'',
        csvPath:'',
        subCatergoryName:[],
        imgPath:[],
      },
      dataArray:[],
      userCsvPath: './csv/',
      userImgPath:'./img/',
   };
   // updates settings attributes if url has variables  
   googleMarkersApp.fetchDataFromUrl = {
           tempObject : {},
           validationArray : [],
           urlString : window.location.search.substring(1),
           pairs : [],
           curPair : [],
           indexOfCategoryInTheTable : [],
           numOfCatergories : 0 ,
           counter : 0, 
        //checks if url has variables
        ckecksIfUrlContainsVariables : function(){
            if(googleMarkersApp.fetchDataFromUrl.urlString==''){//If no variables in the url, user access the app, show Ui  by removing the totalHide class from app html element
                  document.getElementById("app").className = "";
            }else{//User is accesing Iframe 
                googleMarkersApp.fetchDataFromUrl.getVariablesForInitializingTheMap();
            }  
        },
        //Update settings maps attributes and create  the pairs array that contains categories data
        getVariablesForInitializingTheMap : function(){
                googleMarkersApp.fetchDataFromUrl.vars = googleMarkersApp.fetchDataFromUrl.urlString.split("&");
                for (var i=0;i<googleMarkersApp.fetchDataFromUrl.vars.length;i++) {
                  googleMarkersApp.fetchDataFromUrl.curPair = googleMarkersApp.fetchDataFromUrl.vars[i].split("=")
                 if(googleMarkersApp.fetchDataFromUrl.curPair[0] == 'mapLang'){
                    googleMarkersApp.settings.mapLang = googleMarkersApp.fetchDataFromUrl.curPair[1];
                    googleMarkersApp.fetchDataFromUrl.counter--;
                 }else if(googleMarkersApp.fetchDataFromUrl.curPair[0] == 'mapLong'){
                    googleMarkersApp.settings.mapLong = googleMarkersApp.fetchDataFromUrl.curPair[1];
                     googleMarkersApp.fetchDataFromUrl.counter--;
                 }else if(googleMarkersApp.fetchDataFromUrl.curPair[0] == 'zoom'){
                   googleMarkersApp.settings.zoom = googleMarkersApp.fetchDataFromUrl.curPair[1];
                    googleMarkersApp.fetchDataFromUrl.counter--;     
                 }else if(googleMarkersApp.fetchDataFromUrl.curPair[0] == 'layer'){
                    googleMarkersApp.settings.layer = googleMarkersApp.fetchDataFromUrl.curPair[1];
                     googleMarkersApp.fetchDataFromUrl.counter--;
                 }else{
                   googleMarkersApp.fetchDataFromUrl.pairs.push(googleMarkersApp.fetchDataFromUrl.curPair);
                }
              }
              googleMarkersApp.fetchDataFromUrl.calculateNumberOfCategories(); 
        },
        //Finds the number of different categories
        calculateNumberOfCategories : function(){
              for (var i=0;i<googleMarkersApp.fetchDataFromUrl.pairs.length;i++) {
                 if(googleMarkersApp.fetchDataFromUrl.pairs[i][0] == 'categoryName' ){
                      googleMarkersApp.fetchDataFromUrl.numOfCatergories++;
                      googleMarkersApp.fetchDataFromUrl.indexOfCategoryInTheTable.push(i);
                   }
              }
              googleMarkersApp.fetchDataFromUrl.buildDataObjectForEveryCategory();
        },
        //For every category updates settings.data 
        buildDataObjectForEveryCategory : function (){
                var startFrom = 0;
                if(googleMarkersApp.fetchDataFromUrl.indexOfCategoryInTheTable.length == 1){//if last position 
                        finishAt = googleMarkersApp.fetchDataFromUrl.pairs.length;
                }else{
                        finishAt = googleMarkersApp.fetchDataFromUrl.indexOfCategoryInTheTable[1]
                }
                for (var i=0;i<googleMarkersApp.fetchDataFromUrl.numOfCatergories;i++) {  
                  for (var j=startFrom;j<finishAt ;j++) {
                     if(googleMarkersApp.fetchDataFromUrl.pairs[j][0] == 'categoryName'){
                         googleMarkersApp.settings.data.categoryName = googleMarkersApp.fetchDataFromUrl.pairs[j][1];
                     }else if(googleMarkersApp.fetchDataFromUrl.pairs[j][0] == 'csvPath'){
                         googleMarkersApp.settings.data.csvPath = googleMarkersApp.fetchDataFromUrl.pairs[j][1];
                     }else if(googleMarkersApp.fetchDataFromUrl.pairs[j][0] == 'subCatergoryName'){
                         googleMarkersApp.settings.data.subCatergoryName.push(googleMarkersApp.fetchDataFromUrl.pairs[j][1]);
                     }else if(googleMarkersApp.fetchDataFromUrl.pairs[j][0] == 'imgPath'){
                        googleMarkersApp.settings.data.imgPath.push(googleMarkersApp.fetchDataFromUrl.pairs[j][1]);
                     }    
                  }
                  startFrom = googleMarkersApp.fetchDataFromUrl.indexOfCategoryInTheTable[i+1];
                  if((i+2)>=googleMarkersApp.fetchDataFromUrl.numOfCatergories){//if last position 
                      finishAt = googleMarkersApp.fetchDataFromUrl.pairs.length;    
                  }else{
                      finishAt = googleMarkersApp.fetchDataFromUrl.indexOfCategoryInTheTable[i+2];    
                  }
                googleMarkersApp.fetchDataFromUrl.pushDataObjectIntoDataArray();
              }
        },
        //Stores settings.data  to  googleMarkersApp.settings.dataArray 
        pushDataObjectIntoDataArray : function(){
              googleMarkersApp.fetchDataFromUrl.tempObject = (JSON.parse(JSON.stringify(googleMarkersApp.settings.data))); 
              googleMarkersApp.settings.dataArray.push(googleMarkersApp.fetchDataFromUrl.tempObject);
              googleMarkersApp.settings.data.subCatergoryName=[];
              googleMarkersApp.settings.data.imgPath=[];

        },
        init : function(){

        //Initiates algorythm to fetch the data from url
           googleMarkersApp.fetchDataFromUrl.ckecksIfUrlContainsVariables();
        }
    }
   //Appends markers to google maps
   googleMarkersApp.GoogleMapsMultipleMarkers = {
   
    //Checks if the map mast be initialized OR a users action must be executed
    mainHandler : function() {
      if(googleMarkersApp.settings.typeOfAction =='exe') {//If app is loaded first time
          googleMarkersApp.GoogleMapsMultipleMarkers.initiateGoogleMapsByCreatingScriptTag(); 
      }else if(googleMarkersApp.settings.typeOfAction =='preview'){//If user press preview button
          googleMarkersApp.GoogleMapsMultipleMarkers.initialize();
      }else{//If user wants to  show Hide markers
        googleMarkersApp.GoogleMapsMultipleMarkers.eventDetection();
      }
    },//show/hide markers
    eventDetection : function(){
      if(googleMarkersApp.settings.typeOfAction =='' || googleMarkersApp.settings.typeOfAction == null ) {//show markers
        googleMarkersApp.GoogleMapsMultipleMarkers.addMarkKindOf();
        googleMarkersApp.GoogleMapsMultipleMarkers.addClassActive();
      }else{//hide Markers
        googleMarkersApp.GoogleMapsMultipleMarkers.removeMarkKindOf();
        googleMarkersApp.GoogleMapsMultipleMarkers.removeClassActive();
      }
    },//Show markers
    addMarkKindOf : function(){
      for (var i = 0; i <  googleMarkersApp.settings.markers.length; i++) {
        if(googleMarkersApp.settings.markers[i].markerCategory == googleMarkersApp.settings.currentCategory) {
          googleMarkersApp.settings.markers[i].setMap(googleMarkersApp.settings.map);     
        }
      }
    },//Hide Markers
    removeMarkKindOf : function(){
      for (var i = 0; i <  googleMarkersApp.settings.markers.length; i++) {
        if(googleMarkersApp.settings.markers[i].markerCategory == googleMarkersApp.settings.currentCategory) {
          googleMarkersApp.settings.markers[i].setMap(null);
        }
      }
    },//when markers are been shown add active class to category list item 
    addClassActive : function() {
      document.getElementById(googleMarkersApp.settings.currentCategory).setAttribute("class","active");
    },//when markers are been shown add active class to category list item 
    removeClassActive : function() {
      document.getElementById(googleMarkersApp.settings.currentCategory).setAttribute("class","");
    },//Fetch data from Csv
    fetchDataFromCsv : function(i) {
      googleMarkersApp.GoogleMapsMultipleMarkers.CsvToJson(googleMarkersApp.GoogleMapsMultipleMarkers.ajaxCall(googleMarkersApp.settings.dataArray[i].csvPath));
    },//Convert csv data to Json
    CsvToJson :function(csv){
      googleMarkersApp.settings.response = eval("(" +  googleMarkersApp.GoogleMapsMultipleMarkers.splitDataByComma(googleMarkersApp.GoogleMapsMultipleMarkers.cleanTraceQuots(csv)) + ")"); 
    },//asynchronous request to fetch the data from csv
    ajaxCall :  function(Url){
      var xhReq = new XMLHttpRequest();
      xhReq.open("GET", Url, false);
      xhReq.send(null);
      return xhReq.responseText;
    },//Splits data from csv to  json
    splitDataByComma : function(csv){
      var lines=csv.split("\r\n");
      var result = [];
      var headers=lines[0].split(",");
      for(var i=1;i<lines.length;i++) {
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      return JSON.stringify(result); //JSON
    },//cleans quots
    cleanTraceQuots : function(csv) {
      csv = csv.replace(/"/g,"");
      return csv;
    },
    //Creates a script that calls google maps API and initiate the map using the callbackFunction initialize()
    initiateGoogleMapsByCreatingScriptTag : function() {
        var script = document.createElement('script');
        script.id = 'googleMapsApi'
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&'+'callback=googleMarkersApp.GoogleMapsMultipleMarkers.initialize';
        document.body.appendChild(script);
    },//Returns the image icon For every subcategory of a category 
    setImg : function(subCatergoryName,i) {
        var imgPath
        for(k=0;k<googleMarkersApp.settings.dataArray[i].subCatergoryName.length;k++) {
            if(subCatergoryName == googleMarkersApp.settings.dataArray[i].subCatergoryName[k]){
               imgPath = googleMarkersApp.settings.dataArray[i].imgPath[k];
             }
        }
        return imgPath;
    },//Adds a  list item with the name of the category for each category and  an event  Listener in it to triger the show/hide marker functions
    addCategoryButton : function(i) {
      var listItem = document.createElement('li');
      listItem.id = googleMarkersApp.settings.dataArray[i].categoryName;
      var categoryName = googleMarkersApp.settings.dataArray[i].categoryName.replace('%20', ' ');
      listItemTextNode =  document.createTextNode(categoryName);        
      listItem.appendChild(listItemTextNode);
      var myId =  listItem.id 
      document.getElementById('buttonsList').appendChild(listItem).setAttribute("onclick","googleMarkersApp.GoogleMapsMultipleMarkers.trigerShowHideEvent(this);");
      document.getElementById(myId).setAttribute("class","active");
      googleMarkersApp.GoogleMapsMultipleMarkers.addSubCategoriesButtons(listItem.id,i);
    },    //For every category  appends an nested ul with its subcategories
    addSubCategoriesButtons : function(id,i){
     var nestedSubcategoryList = document.createElement('ul');
     nestedSubcategoryList.id = id+'nested';
     nestedSubcategoryList.className = 'nestedSubcategoryList';
     document.getElementById(id).appendChild(nestedSubcategoryList);

     //the nestedSubcategoryList is popupated with listItems.Every list item contains the subcategoryname and img
      for(k=0;k<googleMarkersApp.settings.dataArray[i].subCatergoryName.length;k++) {
         //creates and appends li 
         var nestedSubcategoryListItem = document.createElement('li');
         nestedSubcategoryListItem.id = googleMarkersApp.settings.dataArray[i].subCatergoryName[k]+'subCatergoryName';
         var subCatergoryName =  googleMarkersApp.settings.dataArray[i].subCatergoryName[k].replace('%20', '');
         nestedSubcategoryListItemTextNode =  document.createTextNode(subCatergoryName);
         nestedSubcategoryListItem.appendChild(nestedSubcategoryListItemTextNode);
         document.getElementById(nestedSubcategoryList.id).appendChild(nestedSubcategoryListItem);
         //creates and appends img
         var nestedSubcategoryListItemImage = document.createElement('img');
         nestedSubcategoryListItemImage.src = googleMarkersApp.settings.dataArray[i].imgPath[k];
         document.getElementById(nestedSubcategoryListItem.id).appendChild(nestedSubcategoryListItemImage);
      }
    },
    //Places the markers on the map
    setMarker : function(map, response,i) {
      var image = {  
        size: new google.maps.Size(googleMarkersApp.settings.dim , 32),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 32)
      };
      var contentPopUpShop = [] ;
      infowindow = new google.maps.InfoWindow( {
      content: "holding..." });
      for (var k  in response) {     
        var myLatLng = new google.maps.LatLng( parseFloat(googleMarkersApp.settings.response[k].LATITUDE),parseFloat(googleMarkersApp.settings.response[k].LONGITUDE));
        // set the content of the pop up
        contentPopUpShop[k] = '<div id="content" style="width:110px;height:100px;">'+ '<p> '+googleMarkersApp.settings.response[k].TITLE+ '</p>' + '<p> '+googleMarkersApp.settings.response[k].DESCRIPTION+ '</p>'+'</div>'; 
         // create the marker  
        var marker = new google.maps.Marker( {
            position: myLatLng,
            map: googleMarkersApp.settings.map,
            icon: googleMarkersApp.GoogleMapsMultipleMarkers.setImg(googleMarkersApp.settings.response[k].SUBCATEGORY,i),
            title:googleMarkersApp.settings.response[k].TOWNORCITY,
            zIndex: 1,
            //custom attribute to trace the category of the marker for show/hide function
            markerCategory:googleMarkersApp.settings.dataArray[i].categoryName,
            popUp: contentPopUpShop[k]
        });
        // add event listener to each marker
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.popUp);
            infowindow.open(map, this);
        });
         googleMarkersApp.settings.markers.push(marker);     
      }
    },
    // Initialize the map. Initialize() is been called  when the <script> is been constract by initiateGoogleMapsByCreatingScriptTag 
    initialize : function() {      
        var mapOptions = {
            zoom: parseInt(googleMarkersApp.settings.zoom),
                  center: new google.maps.LatLng(parseInt(googleMarkersApp.settings.mapLang),parseInt(googleMarkersApp.settings.mapLong))   
        }
        googleMarkersApp.settings.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        //Add map Layer
        googleMarkersApp.GoogleMapsMultipleMarkers.addMapLayer();
        //For every category (csv file)
        for(i=0;i<googleMarkersApp.settings.dataArray.length;i++) {
            googleMarkersApp.GoogleMapsMultipleMarkers.addCategoryButton(i);
            googleMarkersApp.GoogleMapsMultipleMarkers.fetchDataFromCsv(i);
            googleMarkersApp.GoogleMapsMultipleMarkers.setMarker(googleMarkersApp.settings.map, googleMarkersApp.settings.response,i); 
        }
    },
    //Map layering
    addMapLayer : function(){
        layer = new google.maps.FusionTablesLayer({
          query: {
            select: "geometry",
            from: googleMarkersApp.settings.layer,
            where: " "
          },
          options: {
            styleId: 2,
            templateId: 2
          }
        });
        var style = [
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [
                { visibility: 'off' }
              ]
            }
        ];
        var styledMapType = new google.maps.StyledMapType(style, {
            map: googleMarkersApp.settings.map,
            name: 'Styled Map'
        });
        googleMarkersApp.settings.map.mapTypes.set('map-style', styledMapType);
        googleMarkersApp.settings.map.setMapTypeId('map-style');
        layer_0 = new google.maps.FusionTablesLayer({
          query: {
            select: "geometry",
            from: googleMarkersApp.settings.layer
          },
          map: googleMarkersApp.settings.map,
          styleId: 2,
          templateId: 2
        });
    },
    //When a category list item is clicked  show/hide marker function is trigered.
    trigerShowHideEvent : function(object) {
       googleMarkersApp.settings.typeOfAction = object.getAttribute('class')
       googleMarkersApp.settings.currentCategory = object.getAttribute('id')
       googleMarkersApp.GoogleMapsMultipleMarkers.mainHandler();
    },
    init : function(){
      googleMarkersApp.fetchDataFromUrl.init();
      googleMarkersApp.GoogleMapsMultipleMarkers.mainHandler();
    }
  },

  //execute GoogleMapsMultipleMarkers
  $(function() {
      googleMarkersApp.GoogleMapsMultipleMarkers.init();
  });

})(window.googleMarkersApp = window.googleMarkersApp || {});








