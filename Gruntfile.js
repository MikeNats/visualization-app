module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Compress html
    minifyHtml: {
        options: {
            cdata: true,
            comments:false
        },
        my_target: {
            files: {
                'index.html': 'index.html',
                'views/piechartTemplate.html': 'views/unMinified/piechartTemplate.html',
                'app/index.html': 'index.html',
                'app/views/piechartTemplate.html': 'views/unMinified/piechartTemplate.html'
            }
        }
    },


    //Compiles Compress and consolidate into one folder all the sass files
    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      my_target: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss',
          'app/css/app.css': 'scss/app.scss'
        }        
      }
    }, 
 
    //Validation of all js files
    //jshint: {
    //  all: ['Gruntfile.js', 'js/**/*.js']
   // },

    //Compress and consolidate into one folder all the js files
    uglify: {
      options: {
          compress: false,
         // beautify : false,
          //sourceMap : false,
          report: 'zip'// 'gzip'
      },
      my_target: {
        files: {  
          'js/all.min.js': 
          [
             'js/lybs/angular.min.js',
             'js/lybs/angular-route.min.js',
             'js/lybs/d3.min.js',
             'bower_components/modernizr/modernizr.js',
             'js/charts/settings.js',
             'js/charts/commonChartFunctionality.js',
             'js/charts/bar/groupedHorizontal/groupedHorizontal.js',
             'js/charts/bar/groupedVertical/groupedVertical.js' ,
             'js/charts/bar/stackVertical/stackVertical.js',
             'js/charts/bar/stackHorizontal/stackHorizontal.js',
             'js/charts/bar/stackPersentageVertical/stackPersentageVertical.js',
             'js/charts/bar/stackPersentageHorizontal/stackPersentageHorizontal.js',
             'js/charts/bar/vertical/vertical.js',
             'js/charts/bar/horizontal/horizontal.js',
             'js/charts/bar/negative/negative.js',
             'js/charts/area/stack/stack.js',
             'js/charts/line/line/line.js',
             'js/charts/pie/pie/pie.js',
             'js/directives/pieChartDirective.js',
             'js/controllers/pieChartController.js',
             'js/Vtool.js',
             'js/app.js',

          ],
          'app/js/all.min.js': 
          [
             'js/lybs/angular.min.js',
             'js/lybs/angular-route.min.js',
             'js/lybs/d3.min.js',
             'bower_components/modernizr/modernizr.js',
             'js/charts/settings.js',
             'js/charts/commonChartFunctionality.js',
             'js/charts/bar/groupedHorizontal/groupedHorizontal.js',
             'js/charts/bar/groupedVertical/groupedVertical.js' ,
             'js/charts/bar/stackVertical/stackVertical.js',
             'js/charts/bar/stackHorizontal/stackHorizontal.js',
             'js/charts/bar/stackPersentageVertical/stackPersentageVertical.js',
             'js/charts/bar/stackPersentageHorizontal/stackPersentageHorizontal.js',
             'js/charts/bar/vertical/vertical.js',
             'js/charts/bar/horizontal/horizontal.js',
             'js/charts/bar/negative/negative.js',
             'js/charts/area/stack/stack.js',
             'js/charts/line/line/line.js',
             'js/charts/pie/pie/pie.js',
             'js/directives/pieChartDirective.js',
             'js/controllers/pieChartController.js',
             'js/Vtool.js',
             'js/app.js',

          ]
        }
      }
    },

    //When a file is changes runs all the above tasks
    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },

     // jshint: {
       // files: 'js/**/*.js',
       // tasks: ['jshint']
     // },

      uglify:{
        files: 'js/**/*.js',
        tasks: ['uglify']
      },

      minifyHtml:{
        files: '**/*.html',
        tasks: ['minifyHtml']
      }


    } 
  });

  grunt.loadNpmTasks('grunt-minify-html');
  grunt.loadNpmTasks('grunt-sass');
 // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['build','watch','uglify','minifyHtml']);
}