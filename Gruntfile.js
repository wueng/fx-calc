(function () {
    module.exports = function (grunt) {

        grunt.initConfig({
            ngAnnotate: {
                minify: {
                    files: {
                        'app/compiled/js/app.js': ['app/js/*.js', 'app/js/**/*.js'],
                    }
                }
            },

            uglify: {
                js: {
                    src: ['app/compiled/js/app.js'],
                    dest: 'app/compiled/js/app.min.js'
                }
            },

            watch: {
                js: {
                    files: ['app/js/**', 'app/views/**'],
                    tasks: ['ngAnnotate', 'uglify']
                }
            }
        });
        grunt.loadNpmTasks('grunt-ng-annotate');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('default', ['ngAnnotate', 'uglify']);
    };

}).call(this);
