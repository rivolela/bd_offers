var config = require('../../config/config.js');
var mongoose = require('mongoose');
var walmartController = require('../controllers/walmart.server.controller.js');
var offerController = require('../controllers/offer.server.controller.js');
var reviewController = require('../controllers/review.server.controller.js');
var request = require('request');
var flatten = require('flat');
var flatten2 = require('flat');
var urlTeste = "http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1141205/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]";
var cheerio = require('cheerio');
var cron = require('node-cron');

var taskWalmart = cron.schedule(config.walmart_schedule, function(err){
  console.log('starting walmart job ...');
  start(function(){
  	console.log("Walmart job finished !");
  });
},false);


function start(next){

	var currentItem = 0;
	console.log("initializing walmart job ...");
	query = {advertiser:'Walmart BR'};

	offerController.getOffersBD(query,function(arrayProductsWalmart){

		console.log("callback get offers Zanox from BD: >>",arrayProductsWalmart.length);	

		walmartController.setDataProducts(currentItem,arrayProductsWalmart,function(arrayProductsWalmart){
			  
			console.log("callback setDataProducts >>",arrayProductsWalmart.length);
				
			walmartController.crawlerByProduct(currentItem,arrayProductsWalmart,function(arrayProductsWalmart){

				console.log("callback crawlerByProduct >>",arrayProductsWalmart.length);
				return next(arrayProductsWalmart);
			});
		});
	});
}


var starJob = function(next){
	return (taskWalmart.start());
};


exports.start = start;
exports.starJob = starJob;





   

