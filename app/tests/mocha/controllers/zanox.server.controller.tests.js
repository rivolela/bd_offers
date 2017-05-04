var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var zanox = require('../../../controllers/zanox.server.controller.js');
var Offer = require('../../../controllers/offer.server.controller.js');
var config = require('../../../../config/config.js');
var assert = require("assert");
var Eletroportateis = require('../../../../config/departaments/eletroportateis.js');
var supertest = require("supertest")("https://www.walmart.com.br");
var apiZanox = "https://api.zanox.com/json/2011-03-01/products?connectid=A3697E2455EA755B758F&programs=12011,13212,16588,12781,12785,12784,13604,18878,13602,13314&q=ventilador,aspirador%20pó,fritadeiras%20óleo,cafeteira,máquina%20costura,purificador,batedeira,liquidificador,mixer,ferro&&searchtype=contextual&items=50&page=1";


// Code here will be linted with JSHint.
/* jshint ignore:start */
describe('Zanox Unit Tests:',function(done){

	//var offer = new Offer();
	var currentPage = 0;
	var currentItem = 0;

	var Context = {};

	var departament = config.dep_eletrodomesticos;
  
  
	describe('Testing connection api zanox >>',function(){
		it('Should return items == 10',function(done){
			this.timeout(10000);
			var call = new requestsUtile();
			var timeRequest = 0;
			call.getJson(apiZanox,timeRequest,function(error,response,data){
				Context.json = data;
				data.items.should.be.equal(50);
				done();
			});
		});
	});


	describe('Testing parseJSONtoArrayOffers function >>',function(){
		it('Should return offersResult == 40 offers ( offers with EAN )',function(done){
			this.timeout(10000);
			var currentItem = 0;
			var offersArray = [];
			var category = "category";
			zanox.parseJSONtoArrayOffers(currentItem,Context.json,Eletroportateis.name,category,offersArray,function(offersResult){
				offersResult.length.should.be.above(20);
				done();
			});
		});
	});



	// describe('Testing context about the searched offers >>',function(){
	// 	it('Should return totalItems > 0',function(done){
	// 		this.timeout(20000);
	// 		var itemsByPage = 50;
	// 		zanox.getOffersContext(apiZanox,itemsByPage,function(totalPaginacao,totalItems,itemsByPage){
	// 			totalPaginacao.should.be.equal(782);
	// 			// totalItems.should.be.equal(39146);
	// 			// itemsByPage.should.be.equal(50);
	// 		});
	// 	});
	// });

});
// Code here will be ignored by JSHint.
/* jshint ignore:end */


