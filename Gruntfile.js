module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        // copy only the files you want to a more organized folder
        bowercopy: {
            libs: {
                options: {
                    destPrefix: "assets/libs"
                },
                files: {
                    //"jquery": "jquery/dist/jquery.min.js",
                    //"bootstrap/scss": "bootstrap-sass/assets/stylesheets",
                    //"bootstrap/fonts": "bootstrap-sass/assets/fonts"
                    //"bootstrap/js": "bootstrap-sass/assets/javascripts/bootstrap.min.js"
                }
            }
            // this is for plugins only, not for big libs like jquery or bootstrap for example
            // plugins: {
            //     options: {
            //         destPrefix: "assets/plugins"
            //     },
            //     files: {
            //         "waypoints": ["waypoints/lib/jquery.waypoints.min.js", "waypoints/lib/shortcuts/sticky.min.js"]
            //
            //     }
            // }
        },
        // concat all js files into one
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                //src: ["assets/libs/jquery/jquery.min.js", "assets/libs/bootstrap/js/bootstrap.min.js", "assets/js/app.js"]
                dest: "assets/js/main.js"
            }
        },
        // compress and convert the main scss file to a css file
        // if you dont use sass, just get rid of this block
        sass: {
            dist: {
                options: {
                    style: "compressed"
                },
                files: {
                    // Destinations         // Source File
                    "assets/css/app.css": "assets/scss/main.scss"
                }
            }
        },
        // minify your JS files
        uglify: {
            my_target: {
                files: {
                    "assets/js/main.min.js": ["assets/js/main.js"]
                }
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
                files: ["assets/js/main.js", "assets/js/app.js"],
                tasks: ["concat", "uglify"]
            }
        }
    });


    grunt.loadNpmTasks("grunt-bowercopy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["bowercopy", "concat", "uglify", "sass", "watch"]);
};
