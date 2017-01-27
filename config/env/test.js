module.exports = {
	
	// Test configuration options
	db:'mongodb://127.0.0.1:27017/bd_test',
	sessionSecret:'testSessionSecret',
	connectid:'A3697E2455EA755B758F',
	timeRequest:1000,

	// Crawler Options 
	// programs ids
	// 12011 : Walmart BR
	// 13212 : Ricardo Eletro BR
	// 16588 : Lojas Colombo BR
	// 12781 : Ponto Frio
	programs_group_01:'12011,13212,16588,12781',
	programs_label_01:'group_01',
	// programs ids
	// 12785 : Casas Bahia BR
	// 12784 : Extra BR
	// 13604 : Brastemp BR
	// 18878 : Girafa BR
	// 13602 : Consul BR
	programs_group_02:'12785,12784,13604,18878,13602',
	programs_label_02:'group_02',

	//queries
	query_eletro:'geladeira' + ',' +
					'fogão' + ',' +
					'microondas' + ',' +
					'ar condicionado' + ',' +
					'lavadora' + ',' +
					'secadora' + ',' + 
					'aspirador' + ',' +
					'liquidificador' + ',' +
					'batedeira' + ',' +
					'ventilador',

	//departaments
	dep_eletro:'eletrodomésticos',

	// schedule offers jobs
	schedule_eletro_01:'34 9 * * *',
	schedule_eletro_02:'13 13 * * *',

	// end offer crawler job


	// crawler job

	query_crawler_group_01:'aspirador',
	query_crawler_group_02:'aspirador',
	
	schedule_crawler_group_01:'40 11 * * *',
	schedule_crawler_group_02:'42 11 * * *',

	// end crawler job

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