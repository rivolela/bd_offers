module.exports = {
// Development configuration options
	db:'mongodb://bdeciding:rovel1954@ds035776.mlab.com:35776/heroku_5lt8spw4',
	sessionSecret:'productSessionSecret',
	connectid:'43EEF0445509C7205827',
	timeRequest:6000,
	// programs ids
	// 12011 : Walmart BR"
	// 13212 : Ricardo Eletro BR
	// 16588 : Lojas Colombo BR
	// 12781 : Ponto Frio
	programs:'12011,13212,16588,12781',
	query:'geladeira',

	// proxy vpn secure
	proxyAuth:'rivolela:Rovel@1976',
	proxyUrl:'proxy-br1.vpnsecure.me:8080',
	proxy:'http://rivolela:Rovel@1976@proxy-br1.vpnsecure.me:8080',


	// schedule offers jobs
	zanox_schedule:'30 12 * * *',

	// schedule reviews jobs
	walmart_schedule:'0 15 * * *',
	ricardo_eletro_schedule:'15 21 * * *',
	lojas_colombo_schedule:'0 18 * * *',
	ponto_frio_schedule:'35 12 * * *',

	// urls crawler
	ricardo_eletro_url: 'http://www.ricardoeletro.com.br/Produto/',
	lojas_colombo: 'https://www.colombo.com.br',
	walmart_url: 'https://www.walmart.com.br/item/',
	ponto_frio_url: 'http://www.pontofrio.com.br/'
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