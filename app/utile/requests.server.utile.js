var URL = require('url-parse');
var request = require('request');
var timeRequestHtml;
var iconv = require('iconv-lite');
var http = require("http");
var config = require('../../config/config.js');


module.exports = function(){


	function getJson(searchUrl,timeRequest,next) {

		timeRequestHtml = timeRequest;

		setTimeout(timeControlCrawler,timeRequestHtml,function(){
			request({
	  			url: searchUrl, //URL to hit
	 			method: 'GET', //Specify the method
	    		headers: { //We can define headers too
	    			'User-Agent': 'request',
	    			'Content-Type': 'application/json;charset=UTF-8',
	    		},
	  		},function(error,response,body){
  				if(error) {
    				console.log("error",error);
    				console.log("response",response);
 				}else{
    				var data = JSON.parse(body);
    				return next(error,response,data);
   				}	
	  		});
		});
	}


	function postJson(searchUrl,data,next) {

		console.log(data);
		console.log(searchUrl);

		request.post({
  			headers: {'User-Agent': 'request','Content-Type' : 'application/json;charset=UTF-8'},
  			url: searchUrl,
  			form:{
  				data
  			}
		}, function(error, response, body){
		  	if(error) {
    				console.log("error",error);
    				console.log("response",response);
 			}else{
    			// var data = JSON.parse(body);
    			return next(error, response, body);
   			}	
		});

		// setTimeout(timeControlCrawler,timeRequestHtml,function(){
		// 	request({
	 //  			url: searchUrl, //URL to hit
	 // 			method: 'POST', //Specify the method
	 //    		headers: { //We can define headers too
	 //    			'User-Agent': 'request',
	 //    			'Content-Type': 'application/json;charset=UTF-8',
	 //    		},
	 //    		form:{data
	 //  		},function(error,response,body){
  // 				if(error) {
  //   				console.log("error",error);
  //   				console.log("response",response);
 	// 			}else{
  //   				var data = JSON.parse(body);
  //   				return next(data,response,error);
  //  				}	
	 //  		});
		// });
	}


    function getHtml(searchUrl,timeRequest,next) {

		timeRequestHtml = timeRequest;

    	setTimeout(timeControlCrawler,timeRequestHtml,function(){
    		request({
    			proxy: config.proxy, 
	    		url: searchUrl, //URL to hit
	      		//qs: {from: 'blog example', time: +new Date()}, //Query string data
	      		method: 'GET', //Specify the method
	      		headers: { //We can define headers too
	        		'User-Agent': 'request',
	         		'Content-Type': 'text/html',
	      		},
	      		//timeout: 10000
  				//followRedirect: true,
  				//maxRedirects: 10,
	  		},function(error,response,body){
	  	 		if(error) {
	     		   console.log(error);
	      		   //return next(error);
	      		} else {
	      			//console.log(body);
	        		console.log("request status code >> ",response.statusCode);
	        		//var bodyWithCorrectEncoding = iconv.decode(body, 'UTF-8');
	        		return next(error,response,body);
	      		}
	  		});
    	});
	}


	function getHtmlGzip(searchUrl,timeRequest,next) {

		timeRequestHtml = timeRequest;

    	setTimeout(timeControlCrawler,timeRequestHtml,function(){
    		request({
    			proxy: config.proxy, 
	    		url: searchUrl, //URL to hit
	      		//qs: {from: 'blog example', time: +new Date()}, //Query string data
	      		method: 'GET', //Specify the method
	      		headers: { //We can define headers too
	        		'User-Agent': "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko)  Chrome/41.0.2228.0 Safari/537.36",
	         		'Content-Type': 'text/html',
	      		},
	      		timeout: 10000,
  				followRedirect: true,
  				maxRedirects: 10,
  				gzip: true,
  				forever:true
	  		},function(error,response,body){

	  	 		if(error) {
	     		   	console.log(error);
	      		   //return next(error);
	      		} else {
	        		console.log("request status code >> ",response.statusCode);
	        		//var bodyWithCorrectEncoding = iconv.decode(body, 'UTF-8');
	        		return next(error,response,body);
	      		}
	  		});
    	});
	}



  	function timeControlCrawler(next){
    	console.log("calling to crawler every >> ",timeRequestHtml," miliseconds");
    	next();
  	}


	return {
        getJson: getJson,
        getHtml: getHtml,
        getHtmlGzip: getHtmlGzip,
        postJson: postJson
    };
};


