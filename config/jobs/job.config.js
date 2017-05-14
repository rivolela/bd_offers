module.exports = {

	 // schedule offers jobs

	// Eletrodomésticos -> 01:00
	// Eletroportátes -> 05:00
	// Smartphones -> 07:00
	// 
	// Offers Reviews -> 08:00
	
	
	// schedule offers jobs
	all_schedule:'0 10 * * *',
<<<<<<< HEAD
	schedule_eletrodomesticos:'30 16 * * *',
	schedule_eletroportateis:'30 15 * * *',
	schedule_smartphones:'30 14 * * *',
	schedule_informatica:'30 13 * * *',
=======
	schedule_eletrodomesticos:'0 0 * * *',
	schedule_eletroportateis:'0 1 * * *',
	schedule_smartphones:'0 2 * * *',
	schedule_informatica:'0 3 * * *',
>>>>>>> 1adadf40157847a949597260a12cc32013bade04
	schedule_games:'0 4 * * *',

	// schedule offers reviews jobs
	schedule_offers_reviews:'40 12 * * *',
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
 // 
 

