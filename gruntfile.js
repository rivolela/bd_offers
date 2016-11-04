module.exports = function(grunt){

	require('jit-grunt')(grunt);

	grunt.initConfig({
		env:{
			dev:{
				NODE_ENV: 'development',
			},
			test:{
				NODE_ENV: 'test',
			},
			test_job:{
				NODE_ENV: 'test_job',
			},
			prod:{
				NODE_ENV: 'production'
			}
		},
		nodemon:{
			dev:{
				script:'server.js',
				options:{
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js','public/**/*.html','public/css/**/*.less']
				}
			},
			debug:{
				script:'server.js',
				options:{
					nodeArgs:['--debug'],
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js']
				}
			}
		},
		mochaTest:{
			//src:'app/tests/mocha/utile/requests.server.utile.tests.js',
			//src:'app/tests/mocha/controllers/walmart.server.controller.tests.js',
			src:'app/tests/mocha/**/*.js',
			options:{
				reporter:'spec'
			}
		},
		casperjs: {
    		options: {
    			engine: 'phantomjs',
    			silent: false
    		},
    		files:['app/tests/casperjs/**/*.js']
  		},
		// karma:{
		// 	unit:{
		// 		configFile:'karma.conf.js'
		// 	}
		// },
		// protractor:{
		// 	e2e:{
		// 		options:{
		// 			configFile:'protractor.conf.js'
		// 		}
		// 	}
		// },
		jshint:{
			options:{
				esversion:6
			},
			all:{
				src:['server.js',
					'config/**/*.js',
					'app/**/*.js']
			}
		},
		// csslint:{
		// 	all:{
		// 		src:'public/modules/**/*.css'
		// 	}
		// },
		// less: {
  //     		dev: {
  //       		options: {
  //         			compress: true,
  //         			yuicompress: true,
  //         			optimization: 2
  //       		},
  //       		files: {
  //         			"public/css/custom_bootstrap.css": "public/css/custom_bootstrap.less" // destination file and source file,

  //       		}
  //     		}
  //  		},
		watch:{
			js:{
				files:['server.js',
						'config/**/*.js',
						'app/**/*.js'],
				tasks:['jshint']
			},
		},
		concurrent:{
			dev:{
				tasks:['nodemon','watch'],
				options:{
					logConcurrentOutput:true
				}
			},
			debug:{
				tasks:['nodemon:debug','watch','node-inspector'],
				options:{
					logConcurrentOutput:true
				}
			}
		},
		'node-inspector':{
			debug:{}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	//grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-contrib-less');
	//grunt.loadNpmTasks('grunt-casperjs');
	grunt.loadNpmTasks('grunt-casperjs-plugin');

	grunt.registerTask('server','Start a custom web server in development', function() {
    	//grunt.log.writeln('Started web server on port 3000');
    	require('./server.js');
	});

	grunt.registerTask('default',['env:dev']);
	grunt.registerTask('dev',['env:dev','jshint','concurrent:debug']);
	grunt.registerTask('mocha',['env:test','server','mochaTest']);
	grunt.registerTask('casper',['env:test','casperjs']);
	grunt.registerTask('test',['env:test','server','casperjs','mochaTest']);
	grunt.registerTask('job',['env:test_job','server','watch']);
	

	grunt.registerTask('dev',['env:dev','server','watch']);

	// grunt.registerTask('lint',['jshint','csslint']);
};






