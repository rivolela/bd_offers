module.exports = {

	// Development configuration options
	db:'mongodb://teste1:teste1234@ds145138.mlab.com:45138/heroku_l4pp17t7',
	sessionSecret:'developmentSessionSecret',
	connectid:'A3697E2455EA755B758F',
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
					'fogão',
					// 'microondas' + ',' +
					// 'ar condicionado' + ',' +
					// 'lavadora' + ',' +
					// 'secadora' + ',' + 
					// 'aspirador' + ',' +
					// 'liquidificador' + ',' +
					// 'batedeira' + ',' +
					// 'panela elétrica' + ',' +
					// 'ventilador',


	query_offer_crawler_zanox:'fogão',

	// schedule offers jobs
	zanox_offer_schedule:'35 0 * * *',
	zanox_offer_crawler_schedule:'15 0 * * *',

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