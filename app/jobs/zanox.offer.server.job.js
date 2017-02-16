var config = require('../../config/config.js'),
 	offerController = require('../controllers/offer.server.controller.js'),
 	zanoxController = require('../controllers/zanox.server.controller.js'),
	request = require('request'),
	flatten = require('flat'),
	flatten2 = require('flat'),
	urlTeste = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=ventilador&programs=12011,13212,16588&items=50",
	cheerio = require('cheerio'),
	async = require('async'),
	cron = require('node-cron'),
	DateUtile = require('../utile/date.server.utile.js');


var job_eletrodomesticos = cron.schedule(config.schedule_eletrodomesticos, function(err){
  console.log('starting job_eletrodomesticos ...');
  var time_start = new Date();	
  var dateUtile = new DateUtile();
  var url = null;
  start(url,
  		config.query_eletrodomesticos,
  		config.programs,
  		config.programs_all,
  		config.dep_eletrodomesticos,
  		config.dictionary_offers,
  		function(){
  			dateUtile.getJobTime(time_start,function(){
  				console.log(" job_eletrodomesticos finished !");
  			});
  		});
},false);



var job_eletroportateis = cron.schedule(config.schedule_eletroportateis, function(err){
  console.log('starting job_eletroportateis ...');
  var time_start = new Date();
  var dateUtile = new DateUtile();
  var url = null;
  start(url,
  		config.query_eletroportateis,
  		config.programs,
  		config.programs_all,
  		config.dep_eletroportateis,
  		config.dictionary_offers,
  		function(){
  			dateUtile.getJobTime(time_start,function(){
  				console.log(" job_eletroportateis finished !");
  			});
  		});
},false);


var job_smartphones = cron.schedule(config.schedule_smartphones, function(err){
  console.log('starting job >> ',config.dep_smartphones);
  var time_start = new Date();
  var dateUtile = new DateUtile();
  var url = null;
  start(url,
  		config.query_smartphones,
  		config.programs,
  		config.programs_all,
  		config.dep_smartphones,
  		config.dictionary_smartphones,
  		function(){
  			dateUtile.getJobTime(time_start,function(){
  				console.log(" job_smartphones finished !");
  			});
  		});
},false);

 // if(process.env.NODE_ENV == 'test_job'){
	// start(urlTeste,function(){
	// 	console.log("end test zanox job");
	// });
 // }



function start(urlSearchOffers,query,programs,group,departament,dictionary,next){

	var currentPage = 0;
	var currentItem = 0;

	offerController.deleteCollectionOffersBD(group,departament,function(){

		console.log("callback deleteCollectionOffersBD >>");

		setUrlOffers(urlSearchOffers,query,programs,dictionary,function(url){

			console.log("callback setUrlOffers >> ",url);

			zanoxController.getOffersContext(url,50,function(totalPaginacao,totalItems,itemsByPage){
				
				console.log("callback getOffersContext >> ");
				
				zanoxController.getOffersPagination(currentPage,totalPaginacao,url,group,departament,function(){
					
	    			console.log("callback get items by page >>");

	    			return next();
	    			
				});
			});
		});

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

 
exports.setUrlOffers = setUrlOffers;
exports.startEletrodomesticos = startEletrodomesticos;
exports.startEletroportateis = startEletroportateis;
exports.startSmartphones = startSmartphones;

