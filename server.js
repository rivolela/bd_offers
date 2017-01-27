process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var mongoose = require('./config/mongoose'),
 	express = require('./config/express'),
 	cron = require('node-cron'),
 	async = require('async'),
 	// job to get offer
 	job_eletro_01 = require('./app/jobs/zanox.offer.server.job.js'),
 	job_eletro_02 = require('./app/jobs/zanox.offer.server.job.js'),
	job_crawler_01 = require('./app/jobs/zanox.offer.crawler.server.job.js');
	job_crawler_02 = require('./app/jobs/zanox.offer.crawler.server.job.js');

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
job_eletro_01.startEletroJob_01();
job_eletro_02.startEletroJob_02();

job_crawler_01.statrCrawlerJob01();
job_crawler_02.statrCrawlerJob02();

module.exports = app;

