
// passing our module the express module
module.exports = function(app) {

    // user services
    var userService = require("./services/user.service.server.js")(app);

};