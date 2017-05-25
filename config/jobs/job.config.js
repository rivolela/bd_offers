module.exports = {

	 // schedule offers jobs

	// Eletrodomésticos -> 01:00
	// Eletroportátes -> 05:00
	// Smartphones -> 07:00
	// 
	// Offers Reviews -> 08:00
	
	
	// schedule offers jobs
	all_schedule:'0 10 * * *',
	schedule_eletrodomesticos:'0 0 * * *',
	schedule_eletroportateis:'0 1 * * *',
	schedule_smartphones:'0 2 * * *',
	schedule_informatica:'0 3 * * *',
	schedule_games:'0 4 * * *',
	schedule_fotografias:'0 5 * * *',

	// schedule offers reviews jobs
	schedule_offers_reviews:'0 16 * * *',
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
 

