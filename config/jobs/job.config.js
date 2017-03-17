module.exports = {

	 // schedule offers jobs

	// Eletrodomésticos -> 01:00
	// Eletroportátes -> 05:00
	// Smartphones -> 07:00
	// 
	// Offers Reviews -> 08:00
	
	
	// schedule offers jobs
	schedule_eletrodomesticos:'18 18 * * *',
	schedule_eletroportateis:'10 19 * * *',
	schedule_smartphones:'25 10 * * *',

	// schedule offers reviews jobs
	schedule_offers_reviews:'0 10 * * *',
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
 

