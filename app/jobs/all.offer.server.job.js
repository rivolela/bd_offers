var config = require('../../config/config.js'),
 	offerCrawlerController = require('../controllers/offer.crawler.server.controller.js'),
 	zanoxJob = require('./zanox.offer.server.job.js'),
 	zanoxController = require('../controllers/zanox.server.controller.js'),
 	request = require('request'),
 	flatten = require('flat'),
 	flatten2 = require('flat'),
 	urlTeste = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=ventilador&programs=12011,13212,16588&items=50",
 	cheerio = require('cheerio'),
 	async = require('async'),
 	cron = require('node-cron'),
 	Zanox = require('../../config/partners/zanox.js'),
 	JobConfig = require('../../config/jobs/job.config.js'),
 	OfferReviews = require('../../config/reviews/offers.reviews.config.js'),
 	Smartphones = require('../../config/departaments/smartphones.js'),
 	Eletrodomesticos = require('../../config/departaments/eletrodomesticos.js'),
	Eletroportateis = require('../../config/departaments/eletroportateis.js'),
	Informatica = require('../../config/departaments/informatica.js'),
	Games = require('../../config/departaments/games.js'),
	CategoryReview = require('../../config/category/category_review.js'),
	DateUtile = require('../utile/date.server.utile.js');
	async = require('async');



var taskAll = cron.schedule(JobConfig.all_schedule, function(err){
  	var time_start = new Date();	
	var dateUtile = new DateUtile();
  	start(function(){
   		dateUtile.getJobTime(time_start,function(){
  		});
  });
},false);



function start(next){

	var currentItem = 0;
	console.log("initializing All job ...");	

	async.parallel([
		// Eletrodomesticos
		function(callback){
			async.map(Eletrodomesticos.array, function(data,callback){
				zanoxJob.start(data,function(result){
					// callback(null, data["query"]);
					callback(null, result);
				});
		    }, function(err, results) {
		    	console.log('results : ' + results); // results : name1,name2,name3 
		    	console.log(" job_eletrodomesticos finished !");
			});
		},
		// Eletrodomesticos
		function(callback){
			async.map(Smartphones.array, function(data,callback){
				zanoxJob.start(data,function(result){
					// callback(null, data["query"]);
					callback(null, result);
				});
		    }, function(err, results) {
		    	console.log('results : ' + results); // results : name1,name2,name3 
		    	console.log(" job_smartphones finished !");
			});
		},
		function(callback){
			async.map(Eletroportateis.array, function(data,callback){
				zanoxJob.start(data,function(result){
					// callback(null, data["query"]);
					callback(null, result);
				});
		    }, function(err, results) {
		    	console.log('results : ' + results); // results : name1,name2,name3 
		    	console.log(" job_eletroportateis finished !");
			});
		},
		function(callback){
			async.map(Informatica.array, function(data,callback){
				zanoxJob.start(data,function(result){
					// callback(null, data["query"]);
					callback(null, result);
				});
		    }, function(err, results) {
		    	console.log('results : ' + results); // results : name1,name2,name3 
		    	console.log(" job_informatica finished !");
			});
		},
		function(callback){
			async.map(Games.array, function(data,callback){
				zanoxJob.start(data,function(result){
					// callback(null, data["query"]);
					callback(null, result);
				});
		    }, function(err, results) {
		    	console.log('results : ' + results); // results : name1,name2,name3 
		    	console.log(" job_games finished !");
			});
		},
		],function (err, result) {
			if(err){
				console.log("err >>",err);
				return next(err);
			}else{
				console.log("result >>",err);
				return next();
			}
	});
}

var starJob = function(next){
	return (taskAll.start());
};


exports.start = start;
exports.starJob = starJob;


