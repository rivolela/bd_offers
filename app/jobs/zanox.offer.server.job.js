var config = require('../../config/config.js');
var offerController = require('../controllers/offer.server.controller.js');
var zanoxController = require('../controllers/zanox.server.controller.js');
var request = require('request');
var flatten = require('flat');
var flatten2 = require('flat');
var urlTeste = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=ventilador&programs=12011,13212,16588&items=50";
var cheerio = require('cheerio');
var async = require('async');
var cron = require('node-cron');

var job_zanox_eletro_01 = cron.schedule(config.schedule_eletro_01, function(err){
  console.log('starting job_zanox_eletro_01 ...');
  var url = null;
  start(url,
  		config.query_eletro,
  		config.programs_group_01,
  		config.programs_label_01,
  		config.dep_eletro,
  		function(){
  	console.log(" job_zanox_eletro_01 finished !");
  });
},false);


var job_zanox_eletro_02 = cron.schedule(config.schedule_eletro_02, function(err){
  console.log('starting job_zanox_eletro_02 ...');
  var url = null;
  start(url,
  		config.query_eletro,
  		config.programs_group_02,
  		config.programs_label_02,
  		config.dep_eletro,
  		function(){
  	console.log(" job_zanox_eletro_02 finished !");
  });
},false);

 // if(process.env.NODE_ENV == 'test_job'){
	// start(urlTeste,function(){
	// 	console.log("end test zanox job");
	// });
 // }



function start(urlSearchOffers,query,programs,group,departament,next){

	var currentPage = 0;
	var currentItem = 0;

	offerController.deleteCollectionOffersBD(group,departament,function(){

		console.log("callback deleteCollectionOffersBD >>");

		setUrlOffers(urlSearchOffers,query,programs,function(url){

			console.log("callback setUrlOffers >> ",url);

			zanoxController.getOffersContext(url,50,function(totalPaginacao,totalItems,itemsByPage){
				
				console.log("callback getOffersContext >> ");
				
				zanoxController.getPagination(currentPage,totalPaginacao,function(paginationArray){
					
	    			console.log("callback get items by page >>",paginationArray);
	    			
	    			zanoxController.getOffersPagination(currentPage,paginationArray,group,departament,function(){

	    				console.log("callback get offers by pagination >>");

	    				return next();

		    		});
				});
			});
		});

	});

}


var setUrlOffers = function(urlSearchOffers,query,programs,next){

	try{
		//if urlSearchOffers is null or empty, set url default
		if(Boolean(urlSearchOffers) === false){
			var host = 'api.zanox.com/json/2011-03-01/';
			var uri = 'products';
			var connectid = 'connectid=' + config.connectid;
			var programs = 'programs=' + programs;
			var query = 'q=' + query;
			//var category = '';
			var items = 'items=50';
			var url = 'https://' + host + uri + '?' + connectid + '&' + programs + '&' + query + '&' + items ;
			return next(url);
		}else{
			return next(urlSearchOffers);
		}
	}catch(error){
		console.log('An error has occurred >> zanox.server.job >>  setUrlOffers : '+ error.message);
    	throw error ;
	}
};


var startEletroJob_01 = function(next){
	return (job_zanox_eletro_01.start());
};

var startEletroJob_02 = function(next){
	return (job_zanox_eletro_02.start());
};


 
exports.setUrlOffers = setUrlOffers;
exports.startEletroJob_01 = startEletroJob_01;
exports.startEletroJob_02 = startEletroJob_02;


