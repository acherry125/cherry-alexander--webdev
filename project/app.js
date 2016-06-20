
// passing our module the express module
module.exports = function(app) {

    var models = require("./models/models.js")();

    // user services
    var userService = require("./services/user.service.server.js")(app, models);
    var eventService = require("./services/event.service.server.js")(app, models);
    var organizationService = require("./services/event.service.server.js")(app, models);


};