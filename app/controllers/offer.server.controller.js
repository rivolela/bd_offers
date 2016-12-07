var mongoose = require('mongoose');
var OfferSchema = require('../models/offer.server.model');
var Offer = mongoose.model( 'Offer', OfferSchema);
var reviewController = require('./review.server.controller.js');

var flatten = require('flat'),
	requestsUtile = require('../utile/requests.server.utile.js'),
 	host = 'api.zanox.com/json/2011-03-01/',
 	uri = 'products',
 	connectid = 'connectid=43EEF0445509C7205827',
 	programs = 'programs=12011',
 	query = 'q=geladeira%20brastemp',
 	category = 'merchantcategory=Eletrodomésticos / Fogões / Fogão 4 bocas',	
 	items = 'items=50',
 	url = 'https://' + host + uri + '?' + connectid + '&' + programs + '&' + query + '&' + category + '&' + items;


var call = new requestsUtile();


var setReviewsCounterOffer = function(offer,next){

	console.log("offer",offer);

	try{
		reviewController.getReviewsCounterByEan(offer.ean,function(result){
			
			console.log("result",result);

			if(result.length > 0){
				offer.countSad = result[0].countSad;
				offer.countHappy = result[0].countHappy;
				offer.totalReviews = result[0].totalReviews;
			}

			return next(offer);
		});
		
	}catch(e){
		console.log('An error has occurred: '+ e.message);
	}
};


var saveArray = function(currentItem,productsArray,next){

	try{
		if(currentItem < productsArray.length){

			var offer = productsArray[currentItem];

			setReviewsCounterOffer(offer,function(offerWithReviews){

				saveOfferBD(offerWithReviews,function(){
					saveArray(currentItem+1,productsArray,next);
				});
			});

		}else{
			return next(productsArray);
		}
	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveOfferBD = function(data,next){

	try{
		var offer = new Offer(data);
  	
	  	offer.save(function(err){
			if(err){
				console.log(err);
				return next(err);
			}else{
				console.log("offer saved:",offer);
				return next();
			}
		});

	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var deleteOfferBD = function(data,next){

	offer = new Offer(data);

  	Offer.remove({ean:offer.ean},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("offer removed:",offer);
			return next();
		}
	});
};


var deleteCollectionOffersBD = function(next){

  	Offer.remove({},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("all offers were removed:");
			return next();
		}
	});
};


var getOffersBD = function(query,next){
	console.log(query);
	Offer.find(query,function(err,offers){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log(offers);
			return next(offers);
		}
	});
};


exports.saveArray = saveArray;
exports.saveOfferBD = saveOfferBD;
exports.getOffersBD = getOffersBD;
exports.deleteOfferBD = deleteOfferBD;
exports.deleteCollectionOffersBD = deleteCollectionOffersBD;
exports.Offer = Offer;
exports.setReviewsCounterOffer = setReviewsCounterOffer;


