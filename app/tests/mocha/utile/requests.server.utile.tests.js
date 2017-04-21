var request = require('request');
var should = require('should');
var RequestsUtile = require('../../../utile/requests.server.utile.js');
var assert = require("assert");
var supertest = require("supertest")("https://www.walmart.com.br");
var config = require('../../../../config/config.js');

var urlJson = 'http://api.zanox.com/json/2011-03-01/products?connectid=43EEF0445509C7205827&q=fogao+brastemp&programs=12011';


describe('Requests Utile Server Tests:',function(){

	it('Should return status code 200 from getJson',function(done){

		this.timeout(4000);
		
		var call = new RequestsUtile();
		var timeRequest = 0;

		call.getJson(urlJson,timeRequest,function(error,response,body){
			should(response.statusCode).equal(200);
			done();
		});
	});



	// it('Should return status code 200 from postJson',function(done){

	// 	this.timeout(4000);

	// 	var url = 'https://da-product-srv-test.herokuapp.com/api/products?connectid=A3697E2455EA755B758F';

	// 	request.post({
 //  			headers: {'User-Agent': 'request','Content-Type' : 'application/json;charset=UTF-8'},
 //  			url: url,
 //  			form:{
	//   			name: 'Tablet 7" Wind Tt-2725 Tectoy',
	// 			ean: 7891196981166,
	// 			manufacturer: 'TecToy',
	// 			departamentBD: 'informática',
	// 			countSad: 14,
	// 			countHappy: 20,
	// 			totalReviews: 34,
	// 			nameURL: 'Tablet 7" Wind Tt-2725 Tectoy',
	// 			image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/5067006-250-250'
 //  			}
	// 	}, function(error, response, body){
	// 			console.log("error",error);
	// 			console.log("response",response);
 //    			console.log("body",body);
 //    			should(response.statusCode).equal(200);
 //    			done();
	// 	});

	// });

});
	

