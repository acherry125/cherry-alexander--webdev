
// passing our module the express module
module.exports = function(app) {

	var userService = require("./services/user.service.server.js")(app);


	// listen for incoming get request (using express.js) to this path
	// execute the function when heard
	// "req" is from express to grab the "message" variable
	// FIRST ARG IS ALWAYS REQUEST, CAN NAME IT ANYTHING
	// SECOND ARG IS ALWAYS RESPONSE, CAN NAME IT ANYTHING
	/*app.get("/say/:message", function(req) {
		var msg = req.params["message"];
		console.log(msg);
	});*/
	/* Send it to the browser
	app.get("/say/:message", function(req, res) {
		var msg = req.params["message"];
		res.send("This is the the message " + msg);
	});
	*/
	 app.get("/say/:message", function(req, res) {
	 var msg = req.params["message"];
	 res.send({"message": msg});
	 });

	users = [
		{
			"name": "al"
		},
		{
			"name": "alex"
		},
		{
			"name": "aldo"
		}
	];




	
};