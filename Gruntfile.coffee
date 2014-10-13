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
          'dist/dateGridTool.js': 'temp/dateGridTool.coffee'
          'example/main.js': 'src/example/main.coffee'
        }
      }
    }

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
          "src/**/*.{coffee,jade,css}"
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


    "string-replace":
      dev:
        files:
          'temp/dateGridTool.coffee': 'src/dateGridTool.coffee'

        options:
          replacements: [
            {
              pattern: "{html}",
              replacement: (match, p1, offset, string) ->
                return grunt.file.read('dist/dateGridTool.html');
            }
          ]




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
    "string-replace"
    "coffee"
    "copy:build"
    "copy:example"
  ]

  grunt.registerTask "default", [
    "clean"
    "build"
  ]
  return
