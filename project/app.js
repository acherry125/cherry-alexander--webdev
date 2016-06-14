
// passing our module the express module
module.exports = function(app) {

    var models = require("./models/models.js")();

    // user services
    var userService = require("./services/user.service.server.js")(app, models);
    var plannerService = require("./services/planner.service.server.js")(app, models);


};