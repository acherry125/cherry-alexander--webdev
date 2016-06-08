module.exports = function() {

    var mongoose = require('mongoose');

    /* found here, makes it work with OpenShift */
    // http://stackoverflow.com/questions/29073657/mongoose-openshift-connection
    var url = '127.0.0.1:27017/second';

	// if OPENSHIFT env variables are present, use the available connection info:
	if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    	url = process.env.OPENSHIFT_MONGODB_DB_URL +
    	process.env.OPENSHIFT_APP_NAME;
	}

	// Connect to mongodb
	var connect = function () {
    	mongoose.connect(url);
	};
	connect();

	var db = mongoose.connection;

	db.on('error', function(error){
    	console.log("Error loading the db - "+ error);
	});

	db.on('disconnected', connect);
	/* end of found on the internet portion */

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose);
    var pageModel;
    var widgetModel;

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};