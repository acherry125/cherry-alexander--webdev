
// passing our module the express module
module.exports = function(app) {
	
	var models = require("./models/models.js")();

	// webservices services
	var userService = require("./services/user.service.server.js")(app, models);
	var websiteService = require("./services/website.service.server.js")(app, models);
	var pageService = require("./services/page.service.server.js")(app, models);
	var widgetService = require("./services/widget.service.server.js")(app, models);
	var flickrService = require("./services/flickr.service.server.js")(app, models);


};