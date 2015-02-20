/** 
  * Chart Settings - D3.js
  * Developed By Michail Tsougkranis 2014-2015.
  * Barnardos Web Development Team. 
*/ 

function chartSettings(){
  
  var settings = {

      //ViewPort settings
      viewPortWidth : function(){

        return angular.element(document.querySelector('#chartContainer'))[0].offsetWidth;

      },
      desktopViewPort:1024,
      tabletViewPort:980,
      mobileViewPort : 480,


      //Functionality settings
      url : "./csv/bar/skata/skata.csv",//UI
      isResponsive : true,//UI
      isPersentage : true,//UI
      hasSubcategories : true,
      isNegative : false,
      automatedLabelAngle : false,//UI  
      
      //Sorting settings
      sortMaxToMinAxisVariable :false,//UI
      sortMaxToMinAxisVariable :false,//UI
      sortMaxToMinAxisQuantitie :true,//UI
      sortMinToMaxAxisQuantitie :false,//UI

      //Style settings
      bgColor : '#fff',//UI
      lightbgColor : 'green',//UI
      darkbgColor : 'yellow',//UI
      barDistance : .2,//UI
      fontSize: 15,

      //Table Content settings
      contentTableShow:true,//UI
      tableLabelsFontSize:13,

      //Positioning settings
      target : '#chart',
      customWidth : 550,
      customHeight :300, 
      outerRadius : 150,
      innerRadius : 10,

      //Dimentions Settings
      svgWidth : function(){
        if(this.isResponsive){
           return angular.element(document.querySelector('#chartContainer'))[0].offsetWidth;
         }else{
           return this.customWidth;
        }
      },

     svgHeight: function(){
       if(this.isResponsive){
           return angular.element(document.querySelector('#chartContainer'))[0].offsetHeight;
        }else{
            return this.customHeight;
        }
      },

      relativeWidth : function() {

        return this.svgWidth() - this.marginLeft() - this.marginRight() - this.marginRightTable();
      }, 

      relativeHeight : function(){
       return  this.height = this.svgHeight()- this.marginTop() - this.marginBottom();
      },

      //Margin Sttings
      customMarginTop : 0,//UI
      customMarginBottom : 0,//UI
      customMarginRight : 0,//UI
      customMarginLeft: 0,//UI
      chartDefaultMarginTop: 20,
      chartDefaultMarginBottom: 70,
      chartDefaultMarginRight:70,
      chartDefaultMarginLeft: 60, 


      marginTop: function(){
          return this.chartDefaultMarginTop + this.customMarginTop;  
      },
      marginBottom: function(){    
          return  this.chartDefaultMarginBottom + this.customMarginBottom;       
      },
      marginLeft: function(){
        return this.chartDefaultMarginLeft + this.customMarginLeft;
      },  
      marginRight: function(){
         return  this.chartDefaultMarginRight + this.marginRightTable() + 2 * this.yAxisLabelFontSize  + this.customMarginRight;
      },
      marginRightTable: function(){
          if( this.contentTableShow && (settings.viewPortWidth() > this.mobileViewPort) ){
              return 70;
          }else{
              return 0;
          }  
      },


     //X Axis Settings
      axiscolor:'#000',
      xAxisTicks : 8,//UI
      xAxisLabelName: 'XAxis Title',//UI
      xAxisLabelAngle :0,//UI
      xAxisFontSize : 10,
      xAxisLabaleX:9,
      xAxisLabelY:2, 
      cutomAngle :45, 


      xAxisPositionDxDy : function (){
          var label = {};

          if(this.xAxisLabelAngle==0){
             if(this.isNegative){
                label.dx = -0.28;
                label.dy =2.2;

             }else{
                label.dx = -.8;
                label.dy = .8;
             }
          }else if(this.xAxisLabelAngle== 45){
             if(this.isNegative){
                label.dx = 0.4;
                label.dy = 2.15;
             }else{
                label.dx = .4;
                label.dy = .6;
             }
          }else if(this.xAxisLabelAngle == 65){
              label.dx = .6;
            if(this.isNegative){
               label.dy = 1.5; 
            }else{
                label.dy = .2; 
            }            
          }else{
              label.dx = 1.5;
              if(this.isNegative){
                label.dy = 1.2;

              }else{

               label.dy = -.5;            
              }
         
            }
          return label;
      },


    //Top X Axis Settings
    xAxisTopticks : 7,//UI
    xAxisTopLabelName: 'XAxisTop Title',//UI 
    xAxisTopLabelAngle : 0,//UI
    xAxisTopLabelX:0,
    xAxisTopLabelY:-21,
    xAxisTopLabelFontSize : 10,    
    xAxisTopPositionDxDy : function (){
          var label = {};
          if(this.xAxisTopLabelAngle==0){
               label.dx = -0.9;
               label.dy = .8;
                       
          }else if(this.xAxisTopLabelAngle== 45){
              label.dx = -0.9;
              label.dy = .4;
        
          }else if(this.xAxisTopLabelAngle == 65){
              label.dx = -0.9;
              label.dy = 0.9;  
          }else{
              label.dx = -0.9;
              label.dy = 1.1;
            }
          return label;
    },

    //Y Axis Settings
    yAxisTopticks : 7,//UI
    yAxisLabelName : 'YAxis Title.',//UI
    yAxisLabelFontSize : 11,
    yAxisLabelAngle:0,//UI
    yAxisLabelX:-57,
    yAxisLabelY:-3,

    yAxisPositionDxDy: function(){
          var labels = {};
          if(this.yAxisLabelAngle == -90){
              labels.dx =-1;
              labels.dy = 7;
          }else if(this.yAxisLabelAngle == 0){
              labels.dx = -2;
              labels.dy =-10;
          }
            return labels;
    },
    yAxisFormat : function(){
        if(this.isPersentage){
            return '%';
         }else{
            return ;
         }
      },


    //Right Y Axis Settings
    yAxisRightLabelName : 'YAxis Right Title',//UI
    yAxisRightFontSize : 11,
    yAxisRightAngle:0,//UI
    yAxisRightPositionDxDy: function(){
        var labels = {};
        if(this.yAxisRightAngle == 0){
            labels.dx = -4;
            labels.dy = -8;
        }
          return labels;
    },

    //Grid Settings Settings
    gridAppend :true,//UI
    gridcolor:'#ccc',
    gridDasharray:'1,1',
    gridWidth:'1px',

    //Grid Horizontal Settings 
    horizontalGridAappend :true,//UI
    horizontalGridTiks : 30,//UI

    //Grid Vertical Settings     
    verticalGridAppend :true,//UI   
    verticalGridTiks : 30,//UI

    
    //Hover  Settings
    hoveredBarStrokeOpacity : 1,//UI
    hoveredBarStroke : 'red',//UI
    hoveredBarStrokeWidth :.4 ,//UI
    


  
  animationTime:200

  }
 return settings;
}
