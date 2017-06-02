var flatten = require('flat'),
	config = require('../../config/config.js'),
 	requestsUtile = require('../utile/requests.server.utile.js'),
 	Offer = require('../controllers/offer.server.controller.js'),
 	OfferCrawler = require('../controllers/offer.crawler.server.controller.js'),
 	config = require('../../config/config.js'),
 	utf8_decode = require('locutus/php/xml/utf8_decode'),
 	offerController = require('../controllers/offer.server.controller.js'),
 	async = require('async'),
 	call = new requestsUtile();


var getOffersContext = function(url,itemsByPage,next){

	try{

		var call = new requestsUtile();
		var timeRequest = 0;

		call.getJson(url,timeRequest,function(error,response,data){
			var totalItems = Number(data.total);
			var totalItemsByPage = Number(data.items);

			var totalPaginacao = Math.trunc(totalItems / totalItemsByPage);
			
			console.log("resume to search:");
			console.log("total paginação:", totalPaginacao);
			console.log("total items:", totalItems);
			console.log("items by Page:", totalItemsByPage);
			console.log("url:", url);			
			console.log('\n');

			return next(totalPaginacao,totalItems,totalItemsByPage);
		});
	}catch(error){
		console.log(error);
	}
	
};


var getOffersCrawlerPagination = function(currentPage,totalPaginacao,url,departament,categoryBD,next){

	try{
		console.log("currentPage >>",currentPage);

		if(currentPage <= totalPaginacao){

			// var pagination = new Object();// jshint ignore:line
			var url_offers = url + "&page=" + currentPage;
			console.log('\n');

			call.getJson(url_offers,config.timeRequest,function(error,response,json) {
				console.log("callback getOffersCrawlerPagination >> ");
				var currentItem = 0;
				saveOffersCrawler(currentItem,json,departament,categoryBD,function(){
					console.log("callback saveOffersCrawler >> ");
					getOffersCrawlerPagination(currentPage+1,totalPaginacao,url,departament,categoryBD,next);
				});
			});
		}else{
			return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var saveOffersPagination = function(currentPage,totalPaginacao,url,departament,categoryBD,next){
	
	try{
		console.log("currentPage >>",currentPage);
		var currentItem = 0;
		var url_offers = url + "&page=" + currentPage;
		console.log('\n');
		

		if(currentPage <= totalPaginacao){

			async.waterfall([
				// step_01 >> get offers pagination
				function(callback){
					call.getJson(url_offers,config.timeRequest,function(error,response,json){
						console.log("callback getJson >> ");
						callback(null,json);
					});
				},
				// step_02 >> parse offer from json to offer bd model
				function(json,callback){
					var offersArray = [];
					parseJSONtoArrayOffers(currentItem,json,departament,categoryBD,offersArray,function(offersResult){
						console.log("callback parseJSONtoArrayOffers >> ");
						console.log("total of offers pagination >> ",json.items);
						console.log("total of offers com EAN >> ",offersResult.length);
						console.log('\n');
						callback(null,offersResult);
					});
				},
				// step_03 >> set offer's url
				function(offersResult,callback){

					async.forEachOf(offersResult, function (value, key, callback) {

						offerController.saveOfferWithReviews(value,function(){
							// console.log("key",key);
							// console.log("value",value.name);
							callback(null,'arg');
						});

					}, function (err) {
					    if (err) console.error(err.message);
					    // configs is now a map of JSON data
					    //doSomethingWith(configs);
					    callback(null,url);
					});
				},

			], function (err, result) {
				if(err){
					console.log("err >>",err);
					return next(err);
				}else{
					saveOffersPagination(currentPage+1,totalPaginacao,url,departament,categoryBD,next);
					// return next();
				}
			});

		}else{
			return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};



var parseJSONtoArrayOffers = function(currentItem,data,departament,categoryBD,offersArray,next){
	
	try{
		if(currentItem < data.items){

			// console.log(data.productItems.productItem[currentItem]);

			var offer = new Object({
				name : data.productItems.productItem[currentItem].name,
				ean : data.productItems.productItem[currentItem].ean,
				category :  data.productItems.productItem[currentItem].merchantCategory,
				merchantProductId : data.productItems.productItem[currentItem].merchantProductId,
				url : data.productItems.productItem[currentItem].trackingLinks.trackingLink[0].ppc,
				manufacturer: data.productItems.productItem[currentItem].manufacturer,
				image_medium: data.productItems.productItem[currentItem].image.medium,
				image_large: data.productItems.productItem[currentItem].image.large,
				price: data.productItems.productItem[currentItem].price,
				price_display: data.productItems.productItem[currentItem].price,
				advertiser: data.productItems.productItem[currentItem].program.$,
				departamentBD: departament,
				categoryBD: categoryBD,
				nameURL: data.productItems.productItem[currentItem].name,
			});

			// TO DO - the zanox api result, although of header response is configured to UTF-8
			// is bringing caracteres with different encode.
			// It is the case of Lojas Colombo BR, that is bringing names like this :
			// Cervejeira Venax, 1 Porta, 100 Litros, IluminaÃ§Ã£o LED, Preta - EXPVQBL100"
			if(offer.advertiser=="Lojas Colombo BR"){
				offer.ean = utf8_decode(offer.ean);
				offer.name = utf8_decode(offer.name);
				offer.category = utf8_decode(offer.category);
				offer.advertiser = utf8_decode(offer.advertiser);
			}

			if (data.productItems.productItem[currentItem].ean !== undefined){
				offersArray.push(offer);
			}

			parseJSONtoArrayOffers(currentItem+1,data,departament,categoryBD,offersArray,next);
		
		}else{
		  return next(offersArray);
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var saveOffersCrawler = function(currentItem,data,departament,categoryBD,next){
	
	try{
		if(currentItem < data.items){

			console.log(data.productItems.productItem[currentItem]);

			var offer = new Object({
				name : data.productItems.productItem[currentItem].name,
				ean : data.productItems.productItem[currentItem].ean,
				category :  data.productItems.productItem[currentItem].merchantCategory,
				merchantProductId : data.productItems.productItem[currentItem].merchantProductId,
				url : data.productItems.productItem[currentItem].trackingLinks.trackingLink[0].ppc,
				manufacturer: data.productItems.productItem[currentItem].manufacturer,
				image_medium: data.productItems.productItem[currentItem].image.medium,
				image_large: data.productItems.productItem[currentItem].image.large,
				price: data.productItems.productItem[currentItem].price,
				price_display: data.productItems.productItem[currentItem].price,
				advertiser: data.productItems.productItem[currentItem].program.$,
				departamentBD:departament,
				categoryBD:query,
			});

			// TO DO - the zanox api result, although of header response is configured to UTF-8
			// is bringing caracteres with different encode.
			// It is the case of Lojas Colombo BR, that is bringing names like this :
			// Cervejeira Venax, 1 Porta, 100 Litros, IluminaÃ§Ã£o LED, Preta - EXPVQBL100"
			if(offer.advertiser=="Lojas Colombo BR"){
				offer.ean = utf8_decode(offer.ean);
				offer.name = utf8_decode(offer.name);
				offer.category = utf8_decode(offer.category);
				offer.advertiser = utf8_decode(offer.advertiser);
			}

			OfferCrawler.saveOfferBD(offer,function(){
				saveOffersCrawler(currentItem+1,data,departament,categoryBD,next);
			});

		}else{
		  return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};

exports.getOffersContext = getOffersContext;
exports.saveOffersPagination = saveOffersPagination;
exports.getOffersCrawlerPagination = getOffersCrawlerPagination;
exports.saveOffersCrawler = saveOffersCrawler;
exports.parseJSONtoArrayOffers = parseJSONtoArrayOffers;







