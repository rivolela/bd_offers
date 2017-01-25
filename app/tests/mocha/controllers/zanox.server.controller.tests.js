var request = require('request');
var should = require('should');
var requestsUtile = require('../../../utile/requests.server.utile.js');
var zanox = require('../../../controllers/zanox.server.controller.js');
var Offer = require('../../../controllers/offer.server.controller.js');
var config = require('../../../../config/config.js');
var assert = require("assert");

var supertest = require("supertest")("https://www.walmart.com.br");

var apiZanox = "http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011";


// Code here will be linted with JSHint.
/* jshint ignore:start */
describe('Zanox Unit Tests:',function(done){

	//var offer = new Offer();
	var currentPage = 0;
	var currentItem = 0;

	var Context = {};
  
	describe('Testing connection api zanox >>',function(){
		it('Should return items == 10',function(done){
			//this.timeout(6000);
			var call = new requestsUtile();
			var timeRequest = 0;
			call.getJson(apiZanox,timeRequest,function(data,response,error){
				data.items.should.be.equal(10);
				done();
			});
		});
	});


	describe('Testing context about the searched offers >>',function(){
		it('Should return totalItems > 0',function(done){
			this.timeout(10000);
			var itemsByPage = 50;
			zanox.getOffersContext(apiZanox,itemsByPage,function(totalPaginacao,totalItems,itemsByPage){
				totalItems.should.be.above(0);
				done();
			});
		});
	});


	describe('Testing pagination == 0 >>',function(){
		it('Should return array Pagination == 0',function(done){
			this.timeout(4000);
			var totalPagination = 0;
			zanox.getPagination(currentPage,totalPagination,apiZanox,function(paginationArray){
				paginationArray.should.have.lengthOf(0);
				done();
			});
		});
	});


	describe('Testing pagination == 10 >>',function(){
		it('Should return array Pagination == 10',function(done){
			this.timeout(4000);
			var totalPagination = 10;
			zanox.getPagination(currentPage,totalPagination,apiZanox,function(paginationArray){
				paginationArray.should.have.lengthOf(10);
				done();
			});
		});
	});

	describe('Testing get offers >>',function(){
		it('Should not to return error',function(done){
			this.timeout(6000);
			var currentPage = 0;
			var currentItem = 0;
			var paginationArray = [];

			var pagination = new Object();
			pagination.url = "https://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&programs=12011&q=geladeira%20brastemp&merchantcategory=Eletrodomésticos / Fogões / Fogão 4 bocas&items=50&page=0";
			pagination.items = 10;
			paginationArray.push(pagination);

			zanox.getOffersPagination(currentPage,paginationArray,config.programs_label_01,config.dep_eletro,function(error){
				should.not.exist(error);
				done();
			});
		});
	});

});
// Code here will be ignored by JSHint.
/* jshint ignore:end */


