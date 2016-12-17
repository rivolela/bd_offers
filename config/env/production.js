module.exports = {
	
	// Production configuration options
	db:'mongodb://bdeciding:rovel1954@ds035776.mlab.com:35776/heroku_5lt8spw4',
	sessionSecret:'productSessionSecret',
	connectid:'43EEF0445509C7205827',
	timeRequest:1000,

	// Crawler Options 
	// programs ids
	// 12011 : Walmart BR"
	// 13212 : Ricardo Eletro BR
	// 16588 : Lojas Colombo BR
	// 12781 : Ponto Frio
	programs:'12011,13212,16588,12781',

	//queries
	query_offer_zanox:'geladeira' + ',' +
					'fogão' + ',' +
					'microondas' + ',' +
					'ar condicionado' + ',' +
					'lavadora' + ',' +
					'secadora' + ',' + 
					'aspirador' + ',' +
					'liquidificador' + ',' +
					'batedeira' + ',' +
					'ventilador',


	query_offer_crawler_zanox:'liquidificador',


	// schedule offers jobs
	zanox_offer_schedule:'0 8 * * *',
	zanox_offer_crawler_schedule:'0 10 * * *',

};


// var task = cron.schedule('* * * * *', function() {
//   console.log('immediately started');
// }, true);

// task.start()

 // # ┌────────────── second (optional)
 // # │ ┌──────────── minute
 // # │ │ ┌────────── hour
 // # │ │ │ ┌──────── day of month
 // # │ │ │ │ ┌────── month
 // # │ │ │ │ │ ┌──── day of week
 // # │ │ │ │ │ │
 // # │ │ │ │ │ │
 // # * * * * * *