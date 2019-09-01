module.exports = function (grunt) {
  grunt.initConfig({
    removelogging: {
      target: {
        files: [{
          expand: true,
          cwd: './src/js',
          src: '*.js',
          dest: 'release/js',
          ext: '.js'
        }]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: './src/img',
            src: ['*.png'],
            dest: 'release/img'
          },
          {expand: true, cwd: './src', src: ['*.json'], dest: 'release', filter: 'isFile'},
        ],
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './src/css',
          src: ['*.css'],
          dest: 'release/css',
          ext: '.css'
        }]
      }
    },
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: './release/js',
          src: '*.js',
          dest: 'release/js',
          ext: '.js'
        }]
      },
      output: {
        comments: false
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'release/popup.html': 'src/popup.html'     // 'destination': 'source'
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-remove-logging");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify-es')
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['removelogging', 'copy', 'cssmin', 'uglify', 'htmlmin']);
};