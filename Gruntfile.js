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
            },

            cacheBust: {
                taskName: {
                    options: {
                        baseDir: 'app',
                        queryString: true,
                        length: 4,
                        assets: ['bower_components/**', 'css/**', 'img/**', 'compiled-js/**']
                    },
                    files: [{
                        src: [
                            'app/index.html'
                        ]
                    }]
                }
            },
        });
        grunt.loadNpmTasks('grunt-ng-annotate');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-cache-bust');

        grunt.registerTask('default', ['ngAnnotate', 'uglify']);
    };

}).call(this);
