var mongoose = require('mongoose');
var OfferSchema = require('../models/offer.server.model');
var Offer = mongoose.model( 'Offer', OfferSchema);
var reviewController = require('./review.server.controller.js');
var async = require('async');
var CurrencyUtile = require('../utile/currency.server.utile.js');
var Config = require('../../config/config.js');
var RequestsUtile = require('../utile/requests.server.utile.js');
var call = new RequestsUtile();


var setReviewsCounterOffer = function(offer,next){

	try{
		reviewController.getReviewsCounterByEan(offer.ean,function(result){
			if(result.length > 0){
				offer.countSad = result[0].countSad;
				offer.countHappy = result[0].countHappy;
				offer.totalReviews = result[0].totalReviews;
			}else{
				offer.countSad = 0;
				offer.countHappy = 0;
				offer.totalReviews = 0;
				console.log("ofertas com ean :", offer.ean, " sem reviews");
			}

			return next(offer);
		});
		
	}catch(e){
		console.log('An error has occurred: setReviewsCounterOffer >> '+ e.message);
	}
};

/**
 * @description save array of offer ( pre-condition: offer needs to have totalReviews > 0) )
 * @param  {currentItem}
 * @param  {productsArray}
 * @param  {next}
 * @return {offersArray}
 */
var saveArray = function(currentItem,offersArray,next){

	try{
		if(currentItem < offersArray.length){

			var offer = offersArray[currentItem];

			setReviewsCounterOffer(offer,function(offerWithReviews){
				if(offerWithReviews.totalReviews > 0){
					saveOfferBD(offerWithReviews,function(){
						saveArray(currentItem+1,offersArray,next);
					});
				}else{
					saveArray(currentItem+1,offersArray,next);
				}				
			});

		}else{
			return next(offersArray);
		}
	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};

var saveArrayOffers = function(currentItem,offersArray,next){

	try{
		if(currentItem < offersArray.length){

			var offer = offersArray[currentItem];

			saveOfferBD(offer,function(){
				saveArrayOffers(currentItem+1,offersArray,next);
			});
	
		}else{
			return next(offersArray);
		}
	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveOfferWithReviews = function(offer,next){

	try{
		async.waterfall([
			// step_01 >> get total os reviews, total of reviews positives and negatives
			function(callback){
				setReviewsCounterOffer(offer,function(offerWithReviews){
					console.log("callback setReviewsCounterOffer >> ");
					callback(null,offerWithReviews);
				});
			},
			// step_02 >> parse offer from json to offer bd model
			function(offerWithReviews,callback){
				if(offerWithReviews.totalReviews > 0){
					saveOfferBD(offerWithReviews,function(){
						callback(null,'arg');
					});
				}else{
					callback(null,'arg');
				}
			},
		], function (err, result) {
			if(err){
				console.log("err >>",err);
				return next(err);
			}else{
				return next();
			}
		});

	}catch(e){
		console.log('An error has occurred: ' + e.message);
	}
};


var saveOfferBD = function(data,next){

	try{
		var offer = new Offer(data);
  	
	  	offer.save(function(err){
			if(err){
				console.log("offer not saved >>",err);
				return next(err);
			}else{
				console.log("offer with EAN >> ", offer.ean ," saved");
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


var deleteCollectionOffersBD = function(departament,next){

	console.log("deleteCollectionOffersBD >>",departament,">>");

  	Offer.remove({departamentBD:departament},function(err){
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

/**
 * [getMinorPrice Minor price of all EAN]
 * @param  {number}   ean  [description]
 * @param  {Function} next [description]
 * @return {Number}   minorPriceEan [description]
 */
var getMinorPrice = function(ean,next){

	var getEan = Number(ean);

    Offer.aggregate([
		{$match : {ean:getEan}},
		{$group : {_id : "$ean",menor_preco:{$min:"$price"}}}
	],
	function (err, minorPriceEan) {
        if(err){
			console.log(err);
			return next(err);
		}else{
			console.log(minorPriceEan);
			return next(minorPriceEan);
		}
        console.log(minorPriceEan);
    });
};


/**
 * [updateOffer description]
 * @param  {Offer}   offer        	[description]
 * @param  {String}  updateFields 	[description]
 * @param  {Function} next         	[description]
 * @return {Offer}                [Offer updated]
 */
var updateOffer = function(offer,updateFields,next){

	query = {_id:offer._id};

	var options = {new:true,upsert:true,setDefaultsOnInsert:true};

    Offer.findOneAndUpdate(query,{"$set":updateFields}, options, function(err, offerUpdated){
		if(err){
			console.log("offer not updated >>",err);
			return next(err);
		}else{
			console.log("offer updated");
			return next(offerUpdated);
		}
	});
};

/**
 * [saveMinorPriceArray save minor price in Offers, based on the minor price of each distinct EAN ]
 * @param  {array}   offersArray [description]
 * @param  {Function} next        [description]
 * @return {array}               [description]
 */
var saveMinorPriceOffers = function(currentItem,offersArray,next){

	try{
		if(currentItem < offersArray.length){

			var offer = offersArray[currentItem];

			async.waterfall([
				// step_01 >> get minor preco of EAN
				function(callback){
					getMinorPrice(offer.ean,function(minorPrice){
						callback(null, minorPrice);
			   		});
				},
				// step_02 >> parse price in Real currency
				function(minorPrice, callback){
					var currencyUtile = new CurrencyUtile();
					var price = minorPrice[0].menor_preco;
					var brazilianPrice = currencyUtile.formatBrazilCurrency(price);
					callback(null, brazilianPrice);
				},
				// step_03 >> update offer with minor preco of EAN
			    function(brazilianPrice, callback) {
  					var updateFields = {minorPriceEAN:brazilianPrice};
  					updateOffer(offer,updateFields,function(offerUpdated){
						callback(null, 'arg');
  					});
			    },
			], function (err, result) {
			    saveMinorPriceOffers(currentItem+1,offersArray,next);
			});

		}else{
			return next();
		}
	}catch(e){
		console.log('An error has occurred >>  saveMinorPriceOffers >> ' + e.message);
		throw e;
	}
};



var saveProductsOffersArray = function(currentItem,offersArray,next){

	try{
		if(currentItem < offersArray.length){

			var offer = offersArray[currentItem];

			async.waterfall([
				// step_01 >> get product by offer ean
				function(callback){
					var urlService = Config.bdService + "products/ean/" + offer.ean;
					console.log("urlService >>",urlService);
					call.getJson(urlService,Config.timeRequest,function(json,response,error){
						console.log("callback get product >> ");
						console.log("json >> ",json.docs[0]);
						callback(null,json.docs[0]);
					});
				},
				// step_02 >> update offer
				function(product, callback){
					if(product !== undefined){
						var updateFields = {product:product._id};
	  					updateOffer(offer,updateFields,function(offerUpdated){
							callback(null);
	  					});
					}else{
						callback(null);
					}
				},
			], function (err, result) {
			    saveProductsOffersArray(currentItem+1,offersArray,next);
			});

		}else{
			return next();
		}
	}catch(e){
		console.log('An error has occurred >>  saveProductsOffersArray >> ' + e.message);
		throw e;
	}
};


exports.saveArray = saveArray;
exports.saveOfferBD = saveOfferBD;
exports.getOffersBD = getOffersBD;
exports.deleteOfferBD = deleteOfferBD;
exports.deleteCollectionOffersBD = deleteCollectionOffersBD;
exports.Offer = Offer;
exports.setReviewsCounterOffer = setReviewsCounterOffer;
exports.saveOfferWithReviews = saveOfferWithReviews;
exports.getMinorPrice = getMinorPrice;
exports.saveMinorPriceOffers = saveMinorPriceOffers;
exports.saveArrayOffers = saveArrayOffers;
exports.updateOffer = updateOffer;
exports.saveProductsOffersArray = saveProductsOffersArray;
