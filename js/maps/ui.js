(function(googleMarkersApp) { 
     //UI implementation
     googleMarkersApp.ui = {
        //Defauls
        inputNames : {
            categoryName : 'Category Name',
            subCategoryName : 'Subcategory Name',
        },
        categoryHTML : $('ul .category').html(),
        subcategoryHTML : $('.subcategory ul li:first-child').html(),
        //Updates the value of inputs On Input Focous Out
        OnInputFocousOut :function(){
            $('body').delegate('input','focusout', function(event){     
                var selectedElement = $(this);
                if(selectedElement.hasClass('dataName')){
                    googleMarkersApp.ui.OnCategoryNameInputFocousOut(selectedElement);
                }else if(selectedElement.hasClass('categoryName')){
                    googleMarkersApp.ui.OnSubCategoryNameInputFocousOut(selectedElement)
                }else{
                    googleMarkersApp.ui.OnInputFocousOutSetItsValue(selectedElement);
                }
            });
        },//On Focous Out sets a default value to input element if the given value is '' or updates with the custom value.
        OnCategoryNameInputFocousOut : function(element){
           if(element.val() == ''){
                 element.val(googleMarkersApp.ui.inputNames.categoryName);
            }else{
                googleMarkersApp.ui.OnInputFocousOutSetItsValue(element);
            }
        },//On Focous Out sets a default value to input element if the given value is '' or updates with the custom value.
        OnSubCategoryNameInputFocousOut : function(element){
          if(element.val() == ''){
               element.val(googleMarkersApp.ui.inputNames.subCategoryName);
            }else{
                googleMarkersApp.ui.OnInputFocousOutSetItsValue(element);
            }
        },//On Focous Out sets Set the value of the inputs focous Out
        OnInputFocousOutSetItsValue : function(element){
              element.attr('value',element.val());
        },//On Focous Out sets Set the value of the inputs focous Out
        OnInputFocousInForLeftPanelInputs :function(){
           $('body').delegate('.dataName','focusin', function(){
               googleMarkersApp.ui.ClearInputValue($(this));
           });
           $('body').delegate('.categoryName','focusin', function(){ 
               googleMarkersApp.ui.ClearInputValue($(this));
           }); 
        }, //Clears the value of selected  input 
        ClearInputValue : function(element){
            element.val('');
        },
        //Show/Hide the input of Custom layer  
        ShowHideCustomLayerInput : function(){
            $('#layer').change(function(){
                if( $(this).val() == 'custom'){
                  $('#kml').css('display','block');
                }else{
                  $('#kml').css('display','none');
                }
            });
        },//Appends categoryHTML
        AppendNewCategory : function(){
            $('.addCategory').on('click',function(){
               $('.leftSide').animate({scrollTop:$('.categoryContainer').height()}, 'slow');
               $('.categoryContainer > ul').append('<li class="category">'+googleMarkersApp.ui.categoryHTML+'</li>');
            });
        },//Removes selected category
        RemoveCategory : function(){
            $('body').delegate('.removecategory','click', function(event){
                $('.leftSide').animate({scrollTop:($('.categoryContainer').height() - $('.category').height())}, 'slow');
                $(this).parent().parent('.category').remove();
            });
        },//Appends subcategoryHTML
        AppendNewSubCategory : function(){
             $('body').delegate('.addSubcategory', 'click',function(){
                $(this).siblings('ul').append('<li>'+googleMarkersApp.ui.subcategoryHTML+'</li>');
             });
        },//Removes selected SubCatecory
        RemoveSubCategory : function(){
            $('body').delegate('.removeSubcategory','click', function(event){
                $(this).parent('.subcategoryRepeat').remove();
            });
        },//Panel Toggler
        ToggleUpAndDownPanel : function (){
            $('.showHide').click(function(){
               $('#app').toggleClass('hide');
            }); 
        },//Clears Top Right Buttons, Hides the Panell, updates the settings that can be found in main.js and runs the map
        PreviewButton : function() {
            $('#submit-parse').click(function(){
                $("#buttonsList").empty();
                $('.showHide').click();
                googleMarkersApp.ui.setSettings();
                googleMarkersApp.ui.preview();
            });
        },//Triger The creation of the iframe url
        IframeTrigerButton : function(){
            $('#getIframe').click(function(){  
                 googleMarkersApp.ui.showIframe(googleMarkersApp.ui.buildUrl());
            });
        },//Hide Iframe container
        IframeExitButton : function(){
           $('body').delegate('#exit','click', function(event){
              googleMarkersApp.ui.hideIframe();
          });
        },//Fetch the value of the inputs and update the googleMarkersApp.settings that can be found in main.js 
        setSettings : function(){
            var tempObject = {};
            googleMarkersApp.settings.dataArray = [];
           //Update map settings
            googleMarkersApp.ui.setMapsSettings(); 
            //For every category update googleMarkersApp.settings.dataArray
            googleMarkersApp.ui.setDataArray();    
        },//Settings are been set to preview mode and then GoogleMapsMultipleMarkers function is called
        preview : function(){
            googleMarkersApp.settings.typeOfAction = 'preview',
            googleMarkersApp.settings.currentCategory = null,
            googleMarkersApp.GoogleMapsMultipleMarkers.mainHandler();
        },//Update map settings
        setMapsSettings : function(){
            googleMarkersApp.settings.mapLang = $('#Lantitude').attr('value');
            googleMarkersApp.settings.mapLong = $('#Lontitude').attr('value');
            googleMarkersApp.settings.zoom = $('#zoom').attr('value');
            googleMarkersApp.ui.setLayer();
           
        },//checks is custom value is swelected and updates layer accordingly
        setLayer : function(){
            if($('#layer').val()=='custom'){
                googleMarkersApp.settings.layer = $('#kml').val();
            }else{
                googleMarkersApp.settings.layer = $('#layer').val();
            }
        },//For each catecory Updates DataArray with settings.data
        setDataArray : function(){
            $('.category').each(function(){
                //Push Category Names in the object
                 googleMarkersApp.settings.data.categoryName = $(this).children('fieldset').children('.dataName').val();
                  //Push Csv urls in the object
                 var csvFileName = $(this).children('fieldset').children('.csvFile').val();
                 csvFileName = csvFileName.split(/\\/g).pop();
                 googleMarkersApp.settings.data.csvPath =  googleMarkersApp.settings.userCsvPath+csvFileName;
                //For every subCategory
                var currentSubcatogories = $(this).children('.subcategory').children('ul').children('li'); 
                currentSubcatogories.each(function(){    
                     //Push subCatergory urls in the object
                     googleMarkersApp.settings.data.subCatergoryName.push($(this).children().children().children('.categoryName').val())
                     //Push Img urls in the object
                     var imgFileName = $(this).children().children('fieldset').children('.imgFile').val().split(/\\/g).pop();
                     googleMarkersApp.settings.data.imgPath.push(googleMarkersApp.settings.userImgPath+imgFileName)
                });
                googleMarkersApp.ui.pushDataObjectIntoDataArray();
            });
        },//push data in to data array
        pushDataObjectIntoDataArray : function(){          
                tempObject = (JSON.parse(JSON.stringify(googleMarkersApp.settings.data))) 
                googleMarkersApp.settings.dataArray.push(tempObject);
                //Clear Data
                googleMarkersApp.settings.data.subCatergoryName =[];
                googleMarkersApp.settings.data.imgPath = [];
                tempObject = null;
        },//Build the iframe url by creating a string with all nesesary valuse from the googleMarkersApp.settings
        buildUrl : function(){
            var stringnifyUrl = window.location+'?mapLang='+googleMarkersApp.settings.mapLang+'&mapLong='+googleMarkersApp.settings.mapLong+'&zoom='+googleMarkersApp.settings.zoom+'&layer='+ googleMarkersApp.settings.layer;
            for(i=0;i<googleMarkersApp.settings.dataArray.length;i++){
                stringnifyUrl = stringnifyUrl+'&categoryName='+googleMarkersApp.settings.dataArray[i].categoryName+'&csvPath='+googleMarkersApp.settings.dataArray[i].csvPath;
                for(k=0;k<googleMarkersApp.settings.dataArray[i].imgPath.length;k++){
                  stringnifyUrl = stringnifyUrl +'&imgPath='+googleMarkersApp.settings.dataArray[i].imgPath[k]
                }
                for(j=0;j<googleMarkersApp.settings.dataArray[i].subCatergoryName.length;j++){
                  stringnifyUrl=stringnifyUrl +'&subCatergoryName='+googleMarkersApp.settings.dataArray[i].subCatergoryName[j]
                }
            }
            return stringnifyUrl;
        },//Appends the url inside the .iframe div
        showIframe : function(incomingUrl){
            $('#gui h3').css('opacity',0);
            $('.iframe').animate({marginBottom:700},700,function(){
                $('.iframe').append('<div class="iframeUrl"><p>'+incomingUrl+'</p><img id="exit" src="./img/exit.png" alt="exit" /></div>');  
            });
        },//Hide the Iframe container
        hideIframe :  function(){
            $('.iframe').empty();
            $('.iframe').animate({marginBottom:0},500);
            $('#gui h3').css('opacity',1);
        },//Initialize the UI
        init : function(){
            googleMarkersApp.ui.OnInputFocousOut();
            googleMarkersApp.ui.ShowHideCustomLayerInput();
            googleMarkersApp.ui.OnInputFocousInForLeftPanelInputs();
            googleMarkersApp.ui.AppendNewCategory();
            googleMarkersApp.ui.RemoveCategory();
            googleMarkersApp.ui.AppendNewSubCategory();
            googleMarkersApp.ui.RemoveSubCategory();
            googleMarkersApp.ui.ToggleUpAndDownPanel();
            googleMarkersApp.ui.PreviewButton();
            googleMarkersApp.ui.IframeTrigerButton();
            googleMarkersApp.ui.IframeExitButton();
        }
      };
      //execute ui
      $(function() {
         googleMarkersApp.ui.init();
      });
})(window.googleMarkersApp = window.googleMarkersApp || {}, jQuery);
