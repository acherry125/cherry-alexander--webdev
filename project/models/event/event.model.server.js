module.exports = function(mongoose) {

    var EventSchema = require("./event.schema.server.js")(mongoose);
    var Event = mongoose.model("Event", EventSchema);

    var api = {
    
    };
    return api;
    
};
    