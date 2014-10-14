#jshint node:true
module.exports = (grunt) ->
  "use strict"

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: {
          'dist/dateGridTool.html': 'src/dateGridTool.jade'
          'example/index.html': 'src/example/index.jade'
        }
      },
    }
    coffee: {
      dev: {
        options: {
          bare: false
        },
        files: {
          'dist/dateGridTool.js': 'src/dateGridTool.coffee'
          'example/main.js': 'src/example/main.coffee'
        }
      }
    },

    cjsx: {
      compile: {
        files: {
          'dist/dateGridTool.jsx': 'src/dateGridTool.cjsx'
        }
      }
    },



    clean:
      dist: "dist/*"
      example: "example/dist/*"


    copy:
      build:
        files: [
          expand: true
          cwd: "src/"
          src: "*.css"
          dest: "dist/"
          filter: "isFile"
        ]
      example:
        files: [
          {
            expand: true
            cwd: "dist/"
            src: "**/*"
            dest: "example/dist/"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "bower_components/"
            src: "**/*"
            dest: "example/lib/"
            filter: "isFile"
          }
        ]

    watch:
      livereload:
        options:
          livereload: true

        files: [
          "src/**/*.{cjsx,jade,css}"
        ]
        tasks: [
          "build"
        ]

    connect: {
      example: {
        options: {
          port: 9000,
          base: ['example'],
          livereload: true,
          open: 'http://localhost:9000/index.html'
        }
      }
    }






  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)
  # Register tasks
  grunt.registerTask "serve", [
    "clean"
    "build"
    "connect"
    "watch"
  ]
  grunt.registerTask "server", ["serve"]
  grunt.registerTask "build", [
    "clean"
    "jade"
    "coffee"
    "cjsx"
    "copy:build"
    "copy:example"
  ]

  grunt.registerTask "default", [
    "clean"
    "build"
  ]
  return
