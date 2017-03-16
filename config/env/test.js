module.exports = {
	
	// Test configuration options
	db:'mongodb://127.0.0.1:27017/bd_test',
	sessionSecret:'testSessionSecret',
	connectid:'A3697E2455EA755B758F',
	timeRequest:1000,
	searchtype:'contextual',
	bdService: "https://bd-services-test.herokuapp.com/api/",

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