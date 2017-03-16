module.exports = {

	// Development configuration options
	db:'mongodb://teste1:teste1234@ds145138.mlab.com:45138/heroku_l4pp17t7',
	// db:'mongodb://127.0.0.1:27017/bd_dev',
	sessionSecret:'developmentSessionSecret',
	connectid:'A3697E2455EA755B758F',
	timeRequest:0,
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