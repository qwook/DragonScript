module.exports = function(grunt) {

  const exec = require('child_process').exec;

  grunt.initConfig({
    watch: {
      files: ['*.dsx'],
      tasks: ['run']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('run', function() {
    exec('node index.js');
  })

};