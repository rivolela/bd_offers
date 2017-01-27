var flatten = require('flat');
var requestsUtile = require('../utile/requests.server.utile.js');
var Offer = require('../controllers/offer.server.controller.js');
var OfferCrawler = require('../controllers/offer.crawler.server.controller.js');
var config = require('../../config/config.js');
var utf8_decode = require('locutus/php/xml/utf8_decode');
var offerController = require('../controllers/offer.server.controller.js');
var paginationArray = [];

var getOffersContext = function(url,itemsByPage,next){

	try{

		var call = new requestsUtile();
		var timeRequest = 0;

		call.getJson(url,timeRequest,function(data){
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


var getPagination = function(currentPage,totalPaginacao,url,next){
	
	console.log("currentPage >>",currentPage);

	if(currentPage <= totalPaginacao){

		var pagination = new Object();// jshint ignore:line
		pagination.url = url + "&page=" + currentPage;
  		paginationArray.push(pagination);
  		console.log("pagination >>",pagination);
		getPagination(currentPage+1,totalPaginacao,url,next);
   
	}else{
		return next(paginationArray);
	}
};


var getOffersPagination = function(currentPage,paginationArray,group,departament,next){

	try{
		if(currentPage < paginationArray.length){

			var call = new requestsUtile();

			call.getJson(paginationArray[currentPage].url,config.timeRequest,function(json,response,error) {

				console.log("getOffersPagination >> ",paginationArray[currentPage].url);

	    		if(error) {
	        		console.log('error: '+ error);
	      		} 
	      		else {
	      			flatten(json),{ 
		   				maxDepth: 10 
		   			};// jshint ignore:line

		   			var currentItem = 0;

		   			saveOffersPagination(currentItem,json,group,departament,function(){
						getOffersPagination(currentPage+1,paginationArray,group,departament,next);
					});

				}
		  	});
		}	
		else{
			return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var saveOffersPagination = function(currentItem,data,group,departament,next){
	
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
				departamentBD: departament,
				programGroup: group
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

			offerController.saveOfferWithReviews(offer,function(){
				saveOffersPagination(currentItem+1,data,group,departament,next);
			});

		}else{
		  return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var getOffersCrawlerPagination = function(currentPage,paginationArray,group,departament,next){

	try{
		if(currentPage < paginationArray.length){

			var call = new requestsUtile();

			call.getJson(paginationArray[currentPage].url,config.timeRequest,function(json,response,error) {

				console.log("getOffersPagination >> ",paginationArray[currentPage].url);

	    		if(error) {
	        		console.log('error: '+ error);
	      		} 
	      		else {
	      			flatten(json),{ 
		   				maxDepth: 10 
		   			};// jshint ignore:line

		   			var currentItem = 0;

		   			saveOffersCrawlerPagination(currentItem,json,group,departament,function(){
						getOffersCrawlerPagination(currentPage+1,paginationArray,group,departament,next);
					});

				}
		  	});
		}	
		else{
			return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};


var saveOffersCrawlerPagination = function(currentItem,data,group,departament,next){
	
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
				departamentBD: departament,
				programGroup: group
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
				saveOffersCrawlerPagination(currentItem+1,data,group,departament,next);
			});

		}else{
		  return next();
		}
	}catch(error){
		console.log(error);
		throw error;
	}
};

exports.getOffersPagination = getOffersPagination;
exports.saveOffersPagination = saveOffersPagination;
exports.getPagination = getPagination;
exports.getOffersContext = getOffersContext;
exports.getOffersCrawlerPagination = getOffersCrawlerPagination;
exports.saveOffersCrawlerPagination = saveOffersCrawlerPagination;







