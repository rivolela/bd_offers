var config = require('../../config/config.js'),
 	offerCrawlerController = require('../controllers/offer.crawler.server.controller.js'),
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
	TV = require('../../config/departaments/tv.js'),
	Fotografia = require('../../config/departaments/fotografias.js'),
	Informatica = require('../../config/departaments/informatica.js'),
	Games = require('../../config/departaments/games.js'),
	CategoryReview = require('../../config/category/category_review.js'),
	DateUtile = require('../utile/date.server.utile.js');
	async = require('async');
	moment = require('moment');


var job_crawler = cron.schedule(JobConfig.schedule_offers_reviews,  function(err){
	console.log('starting job_crawler ...');
  	var url = null;

  	getDepartament('arg',function(departament){

  		// var departament_2 = TV.array;

  		async.map(departament, function(data,callback){
			start(data,function(result){
				// callback(null, data["query"]);
				callback(null, result);
			});
	    }, function(err, results) {
	    	console.log('results : ' + results); // results : name1,name2,name3 
	    	console.log(" job_crawler finished !");
		});

  	});

},false);


 // if(process.env.NODE_ENV == 'test_job'){
	// start(urlTeste,function(){
	// 	console.log("end test zanox job");
	// });
 // }


function start(item,next){

	var query = item.query;
	var dictionary = item.dictionary;
	var departament = item.departament;
	var programs = item.programs;
	var currentPage = 0;
	var currentItem = 0;


	async.waterfall([
		// step_01 >> delelte all offers
		function(callback){
			offerCrawlerController.deleteCollectionOffersBD(function(){
				console.log("callback deleteCollectionOffersBD >>");
				callback(null, 'arg');
			});
		},
		// step_02 >> set offer's url
		function(arg,callback){
			var urlSearchOffers = null;
			setUrlOffers(urlSearchOffers,query,programs,dictionary,function(url){
				console.log("callback setUrlOffers >> ",url);
				callback(null,url);
			});
		},
		// step_03 >> get offers context
	    function(url, callback) {
	    	zanoxController.getOffersContext(url,50,function(totalPaginacao,totalItems,itemsByPage){
	    		console.log("callback getOffersContext >> ");
	    		callback(null,totalPaginacao,url);
	    	});
	    },
	    // step_04 >> getOffersCrawlerPagination
	    function(totalPaginacao,url,callback){
	    	zanoxController.getOffersCrawlerPagination(currentPage,totalPaginacao,url,departament,query,function(){
				console.log("callback getOffersPagination >>");
				callback(null,'arg');
			});
	    }
		], function (err, result) {
			if(err){
				console.log("err >>",err);
				return next(err);
			}else{
				return next();
			}
	});
}



var setUrlOffers = function(urlSearchOffers,query,programs,dictionary,next){

	try{
		//if urlSearchOffers is null or empty, set url default
		if(Boolean(urlSearchOffers) === false){
			var host = 'api.zanox.com/json/2011-03-01/';
			var uri = 'products';
			var connectid = 'connectid=' + config.connectid;
			var set_programs = 'programs=' + programs;
			var set_query = 'q=' + query;
			var searchtype = 'searchtype=' + config.searchtype;
			var merchantcategory = dictionary;
			var items = 'items=50';
			var url = 'https://' + host + uri + '?' + connectid + '&' + set_programs + '&' + set_query + '&' + merchantcategory + '&' + items ;
			return next(url);
		}else{
			return next(urlSearchOffers);
		}
	}catch(error){
		console.log('An error has occurred >> zanox.server.job >>  setUrlOffers : '+ error.message);
    	throw error ;
	}
};


var startCrawlerJob = function(next){
	return (job_crawler.start());
};


function getDepartament(argument,next) {

	var departament;

	console.log("data >> ",moment().date());

	var day = Number(moment().date());

	switch (day) {
	    case 1:
			console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	    case 2:
			// console.log("set departament >> Eletroportateis");
	  //   	departament = Eletroportateis.array;
	    	console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	    case 3:
			console.log("set departament >> Fotografia");
	    	departament = Fotografia.array;
	    	break;
	    case 4:
			console.log("set departament >> Games");
	    	departament = Games.array;
	    	break;
	    case 5:
			console.log("set departament >> Informatica");
	    	departament = Informatica.array;
	    	break;
	    case 6:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 7:
			console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	   	case 8:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 9:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 10:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 11:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 12:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 13:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 14:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 15:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 16:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 17:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 18:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 19:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 20:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 21:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 22:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 23:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case 24:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 25:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	   	case 26:
			console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	    case 27:
			console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	    case 28:
			console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	   	case 29:
			console.log("set departament >> TV");
	    	departament = TV.array;
	    	break;
	    case 30:
			console.log("set departament >> Smartphones");
	    	departament = Smartphones.array;
	    	break;
	    case  31:
	        console.log("set departament >> TV");
	    	departament = TV.array;
	}

	return next(departament);
}
 

exports.setUrlOffers = setUrlOffers;
exports.startCrawlerJob = startCrawlerJob;



