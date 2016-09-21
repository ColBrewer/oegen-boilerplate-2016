module.exports = function(grunt) {

    /*
        Grunt installation:
        -------------------
            npm install -g grunt-cli
            npm install -g grunt-init
            npm init (creates a `package.json` file)

        Project Dependencies:
        ---------------------
            npm install grunt --save-dev
            npm install grunt-contrib-concat --save-dev
            npm install grunt-contrib-uglify --save-dev
            npm install grunt-contrib-sass --save-dev
            npm install grunt-autoprefixer --save-dev
            npm install grunt-contrib-connect --save-dev
            npm install grunt-contrib-watch --save-dev


        Simple Dependency Install:
        --------------------------
            npm install (from the same root directory as the `package.json` file)

            */

    // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    sass: {
      options: {
        // set loadpath to any external libraries or frameworks
        loadPath: []
      },
      dev: {
        options: {
          style: 'expanded',
            //debugInfo: true,
            //lineNumbers: true,
        },
        files: {
          'css/main.css': 'scss/main.scss',
        }
      },  
      build: {
        options: {
          style: 'compressed',
            //debugInfo: true,
            //lineNumbers: true,
        },
        files: {
          'css/main.css': 'scss/main.scss',
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      dev: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: 'css/',
          src: '{,*/}*.css',
          dest: 'css'
        }]
      }
      
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '../',
          livereload: false
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['**/*.html'],
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev', 'postcss:dev']
      },
      css: {
        files: ['css/main.css'],
        tasks: []
      }
    },

  });

  // Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  
  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass:dev', 'postcss:dev', 'watch']);
  grunt.registerTask('build', ['sass:build', 'postcss:dev', 'watch']);

  // Starts livereload (requires browser plugin: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
  // Starts 'connect' for local environment
  // Call 'grunt watch' directly where 'connect' is not required
  grunt.registerTask('live', ['connect', 'watch']);

  
};
