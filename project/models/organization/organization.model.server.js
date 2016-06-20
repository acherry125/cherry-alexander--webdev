module.exports = function(mongoose) {

    var OrganizationSchema = require("./organization.schema.server.js")(mongoose);
    var Organization = mongoose.model("Organization", OrganizationSchema);

    var api = {
    
    };
    return api;
    
};
    