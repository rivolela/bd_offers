process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var mongoose = require('./config/mongoose'),
 	express = require('./config/express'),
 	cron = require('node-cron'),
 	async = require('async'),
 	// job to get offer
 	zanoxOfferJob = require('./app/jobs/zanox.offer.server.job.js')
	zanoxOfferCrawlerJob = require('./app/jobs/zanox.offer.crawler.server.job.js');


var db = mongoose();
var app = express();


//app.listen(3000);
var server_port;

if(process.env.NODE_ENV == 'production'){
	server_port = process.env.PORT || 80;
}else{
	server_port = 3000;
}

app.listen(server_port,function() {
    console.log('Server runnning on port %d', server_port);
});


// job to get offer
zanoxOfferJob.starJob();
zanoxOfferCrawlerJob.starJob();


module.exports = app;

