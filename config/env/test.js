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
	// 12785 : Casas Bahia BR
	// 12784 : Extra BR
	// 13604 : Brastemp BR
	// 18878 : Girafa BR
	// 13602 : Consul BR

	// all programs
	programs:'12011,13212,16588,12781,12785,12784,13604,18878,13602',
	programs_all:'group_all',
	
	// offer crawler job
	
	//queries
	query_eletrodomesticos:'geladeira' + ',' +
					'fogão' + ',' +
					'microondas' + ',' +
					'ar condicionado' + ',' +
					'lavadora' + ',' +
					'secadora',

	query_eletroportateis:'aspirador pó' + ',' +
					'liquidificador' + ',' +
					'batedeira' + ',' +
					'ventilador',

	//departaments
	dep_eletrodomesticos:'eletrodomésticos',
	dep_eletroportateis:'eletroportáteis',

	// schedule offers jobs
	schedule_eletrodomesticos:'53 13 * * *',
	schedule_eletroportateis:'13 13 * * *',

	// end offer crawler job


	// crawler job

	query_crawler:'aspirador',
	
	schedule_crawler:'46 13 * * *',

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