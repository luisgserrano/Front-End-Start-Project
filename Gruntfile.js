module.exports = function(grunt) {
    "use strict";
    //noinspection JSDuplicatedDeclaration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // copy only the files you want to a more organized folder
        bowercopy: {
            libs: {
                options: {
                    destPrefix: "dist/assets/libs"
                },
                files: {
                    "jquery": ["jquery/dist/jquery.min.js", "jquery-migrate/jquery-migrate.min.js"],
                    "bootstrap/scss": "bootstrap-sass/assets/stylesheets",
                    "bootstrap/fonts": "bootstrap-sass/assets/fonts",
                    "bootstrap/js": "bootstrap-sass/assets/javascripts/bootstrap.min.js"
                }
            }
            //this is for plugins only, not for big libs like jquery or bootstrap for example
            // plugins: {
            //     options: {
            //         destPrefix: "assets/plugins"
            //     },
            //     files: {
            //         "waypoints": ["waypoints/lib/jquery.waypoints.min.js", "waypoints/lib/shortcuts/sticky.min.js"]

            //     }
            // }
        },
        // concat all js files into one
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["dist/assets/libs/jquery/jquery.min.js", "dist/assets/libs/jquery/jquery-migrate.min.js", "dist/assets/libs/bootstrap/js/bootstrap.min.js", "dist/assets/js/app.js"],
                dest: "dist/assets/js/main.js"
            }
        },
        // compress and convert the main scss file to a css file
        // if you dont use sass, just get rid of this block
        sass: {
            options: {
                    style: "compressed"
                },
                dist: {
                    files: {
                        // Destinations         // Source File
                        "dist/assets/css/app.css": "assets/scss/main.scss"
                    }
                }
        },
        // minify your JS files
        uglify: {
            my_target: {
                files: {
                    "dist/assets/js/main.min.js": ["dist/assets/js/main.js"]
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/assets/css/' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'dist/assets/css/*.css'
            }
        },
        // watch your scss and js files
        // if you'r using only css, just change for your css file
        // If you edit any of those files, those tasks will be executed
        watch: {
            grunt: {
                files: ["Gruntfile.js"]
            },
            sass: {
                files: ["assets/scss/*.scss"],
                tasks: ["sass"]
            },
            js: {
                files: ["dist/assets/js/main.js", "dist/assets/js/app.js"],
                tasks: ["concat", "uglify"]
            }
        }
    });


    grunt.loadNpmTasks("grunt-bowercopy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask("default", ["concat", "uglify", "sass", "postcss", "watch"]);
};
