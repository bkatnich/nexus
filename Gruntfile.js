/**
 * Gruntfile.js
 *
 * Created by Britton Katnich on February 27th, 2019.
 * Copyright © 2018 Britton Katnich. All rights reserved.
 */
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          { expand: true, cwd: 'src', src: ['**'], dest: 'dist/' }
        ]
      }
    }
  });

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);
};
