module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  var jsSrc = ['assets/js/jquer-2.1.0.js', 'assets/js/least.js', 'assets/js/mygallery.js']
    , jsDist = 'js/all.min.js'

  // Configuration de Grunt
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          "expand": true,
          "cwd": "assets/scss/",
          "src": ["**/*.scss"],
          "dest": "css/",
          "ext": ".css"
        }]
      },
      dev: {}
    },
    concat: {
      options: {
        separator: ';'
      },
      compile: {
        src: jsSrc,
        dest: jsDist
      }
    },
    uglify: {
      options: {
        separator: ';'
      },
      compile: {
        src: jsSrc,
        dest: jsDist
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 9
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img/',
            src: ['**/*.png'],
            dest: 'img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img/',
            src: ['**/*.jpg'],
            dest: 'img/',
            ext: '.jpg'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', ['dev'])
  grunt.registerTask('dev', ['styles:dev', 'scripts:dev', 'imagemin'])
  grunt.registerTask('dist', ['styles:dist', 'scripts:dist', 'imagemin'])

  grunt.registerTask('scripts:dev', ['concat:compile'])
  grunt.registerTask('scripts:dist', ['uglify:compile'])

  grunt.registerTask('styles:dev', ['sass:dev'])
  grunt.registerTask('styles:dist', ['sass:dist'])
}