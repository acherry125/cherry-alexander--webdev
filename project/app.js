
// passing our module the express module
module.exports = function(app) {

    var models = require("./models/models.js")();

    // user services
    var userService = require("./services/user.service.server.js")(app, models);
    var posterService = require("./services/poster.service.server.js")(app, models);


};