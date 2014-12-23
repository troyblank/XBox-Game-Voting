module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}'],
                tasks: ['sass:dev', 'notify:sass']
            },
            uglify: {
                files: ['js/**/*.js'],
                tasks: ['test', 'uglify:dev', 'notify:uglify']
            },
            grunticon: {
                files: ['svg/**/*.svg'],
                tasks: ['icon', 'notify:sass']
            },
            livereload: {
                options: {
                    livereload: true,
                },
                files: [
                    'web/static/styles/*.css'
                ]
            }
        },
        sass: {
            dev: {
                options: {
                    debugInfo: true,
                    sourcemap: true
                },
                files: {
                    'web/static/styles/styles.css': 'sass/styles.scss',
                    'web/static/styles/print.css': 'sass/print.scss'
                }
            },
            deploy: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'web/static/styles/styles.css': 'sass/styles.scss',
                    'web/static/styles/print.css': 'sass/print.scss'
                }
            }
        },
        uglify: require('./js/grunt/uglify.js'),
        notify: {
            sass: {
                options: {
                    title: 'SASS',
                    message: 'SASS has compiled!'
                }
            },
            uglify: {
                options: {
                    title: 'Uglify',
                    message: 'Uglify has compiled!'
                }
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'svg',
                    src: ['**/*.svg'],
                    dest: 'svg/tmp'
                }]
            }
        },
        grunticon: {
            all: {
                options: {
                    src: 'svg',
                    dest: 'svg/tmp',
                    svgo: true,
                    pngcrush: true
                }
            }
        },
        clean: {
            grunticon: ['svg/tmp']
        },
        copy: {
            grunticon: {
                expand: true,
                cwd: 'svg/tmp',
                src: ['icons.data.svg.css'],
                dest: 'sass/partials/svg',

                rename: function(dest, src) {
                    return dest + '/_' + src.replace(/\.css$/, ".scss");
                }

            }
        },
        jasmine: {
            controls: {
                src: ['js/util/*.js', 'js/control/*.js'],
                options: {
                    vendor: ['js/lib/**/*.js', 'js/util/**/*.js'],
                    specs: ['js/spec/*.js', 'js/spec/util/*.js', 'js/spec/control/*.js'],
                    helpers: ['js/spec/lib/*.js', 'js/spec/helpers/*.js']
                }
            }
        }
    });

    grunt.registerTask('default', [
        'icon',
        'sass:dev',
        'uglify:dev',
        'watch'
    ]);

    grunt.registerTask('test', 'jasmine testing', [
        'jasmine:controls'
    ]);

    grunt.registerTask('icon', 'grunticon icon tasking', [
        'newer:svgmin',
        'grunticon',
        'copy:grunticon',
        'clean:grunticon'
    ]);

    grunt.registerTask('deploy', [
        'icon',
        'sass:deploy',
        'uglify:deploy'
    ]);

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
}