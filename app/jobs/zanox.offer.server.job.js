var config = require('../../config/config.js'),
	Eletrodomesticos = require('../../config/departaments/eletrodomesticos.js'),
	Eletroportateis = require('../../config/departaments/eletroportateis.js'),
	Smartphones = require('../../config/departaments/smartphones.js'),
	Informatica = require('../../config/departaments/informatica.js'),
	Games = require('../../config/departaments/games.js'),
	Fotografia = require('../../config/departaments/fotografias.js'),
	Zanox = require('../../config/partners/zanox.js'),
	JobConfig = require('../../config/jobs/job.config.js'),
 	offerController = require('../controllers/offer.server.controller.js'),
 	zanoxController = require('../controllers/zanox.server.controller.js'),
	request = require('request'),
	flatten = require('flat'),
	flatten2 = require('flat'),
	urlTeste = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=ventilador&programs=12011,13212,16588&items=50",
	cheerio = require('cheerio'),
	cron = require('node-cron'),
	DateUtile = require('../utile/date.server.utile.js'),
	async = require('async');


var job_eletrodomesticos = cron.schedule(JobConfig.schedule_eletrodomesticos, function(err){
	console.log('starting job_eletrodomesticos ...');
  	var time_start = new Date();	
  	var dateUtile = new DateUtile();
  	async.map(Eletrodomesticos.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_eletrodomesticos finished !");
	});
},false);


var job_eletroportateis = cron.schedule(JobConfig.schedule_eletroportateis, function(err){
  	console.log('starting job_eletroportateis ...');
  	var time_start = new Date();
  	var dateUtile = new DateUtile();
  	async.map(Eletroportateis.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_eletroportateis finished !");
	});
},false);


var job_smartphones = cron.schedule(JobConfig.schedule_smartphones, function(err){
  	console.log('starting job_smartphones ...');
  	var time_start = new Date();
  	var dateUtile = new DateUtile();
	async.map(Smartphones.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_smartphones finished !");
	});
},false);


var job_informatica = cron.schedule(JobConfig.schedule_informatica, function(err){
	console.log('starting job_informatica ...');
  	var time_start = new Date();
  	var dateUtile = new DateUtile();
  	async.map(Informatica.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_informatica finished !");
	});
},false);


var job_games = cron.schedule(JobConfig.schedule_games, function(err){
	console.log('starting job_games ...');
  	var time_start = new Date();
  	var dateUtile = new DateUtile();
  	async.map(Games.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_games finished !");
	});
},false);


var job_fotografias = cron.schedule(JobConfig.schedule_fotografias, function(err){
	console.log('starting job_fotografias ...');
  	async.map(Fotografia.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_fotografias finished !");
	});
},false);


var job_tv = cron.schedule(JobConfig.schedule_tv, function(err){
	console.log('starting job_tv ...');
  	async.map(tv.array, function(data,callback){
		start(data,function(result){
			// callback(null, data["query"]);
			callback(null, result);
		});
    }, function(err, results) {
    	console.log('results : ' + results); // results : name1,name2,name3 
    	console.log(" job_tv finished !");
	});
},false);


 // if(process.env.NODE_ENV == 'test_job'){
	// start(urlTeste,function(){
	// 	console.log("end test zanox job");
	// });
 // }

function getFullName(item, next) {
    var fullname = [item.query,item.dictionary].join(" ");
    console.log("fullname",fullname);
    next();
}


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
			offerController.deleteCategoryOffersBD(query,function(){
				console.log("callback deleteCategoryOffersBD>>");
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
	    // step_04 >> getOffers BY Pagination
	    function(totalPaginacao,url,callback){
	    	var currentPage = 0;
	    	zanoxController.saveOffersPagination(currentPage,totalPaginacao,url,departament,query,function(){
				console.log("callback get items by page >>");
				callback(null,'arg');
			});
	    },
	    // step_05 >> get offers
	    function(arg,callback){
	    	offerController.getOffersBD({categoryBD:query},function(offersArray){
				console.log("offersArray >>",offersArray);
				callback(null,offersArray);
			});
	    },
	    // step_06 >> save minor price in offers
	    function(offersArray,callback){
	    	var currentItem = 0;
			offerController.saveMinorPriceOffers(currentItem,offersArray,function(){
				console.log("callback saveMinorPriceOffers >>");
				callback(null,offersArray);
			});
	    },
	    // step_07 >> save product for each offer
	    function(offersArray,callback){
	    	var currentItem = 0;
	    	offerController.saveProductsOffersArray(currentItem,offersArray,function(){
	    		var result = "departament : " + departament + " | category : " + query + " | total of offers : " + offersArray.length;
				callback(null,result);
	    	});
	    }
	], function (err, result) {
		if(err){
			console.log("err >>",err);
			return next(err);
		}else{
			return next(result);
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
			var url = 'https://' + host + uri + '?' + connectid + '&' + set_programs + '&' + set_query + '&' + merchantcategory + '&' + searchtype + '&' + items ;
			return next(url);
		}else{
			return next(urlSearchOffers);
		}
	}catch(error){
		console.log('An error has occurred >> zanox.server.job >>  setUrlOffers : '+ error.message);
    	throw error ;
	}
};


var startEletrodomesticos = function(next){
	return (job_eletrodomesticos.start());
};

var startEletroportateis = function(next){
	return (job_eletroportateis.start());
};

var startSmartphones = function(next){
	return (job_smartphones.start());
};

var startInformatica = function(next){
	return (job_informatica.start());
};

var startGames = function(next){
	return (job_games.start());
};

var startFotografias = function(next){
	return (job_fotografias.start());
};

var startTV = function(next){
	return (job_tv.start());
};
 
exports.setUrlOffers = setUrlOffers;
exports.startEletrodomesticos = startEletrodomesticos;
exports.startEletroportateis = startEletroportateis;
exports.startSmartphones = startSmartphones;
exports.startInformatica = startInformatica;
exports.startGames = startGames;
exports.startFotografias = startFotografias;
exports.startTV = startTV;
