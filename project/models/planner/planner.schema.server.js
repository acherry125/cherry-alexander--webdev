module.exports = function(mongoose) {

    var PlannerSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        // can use a regex to make the email too
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "Widget"}],
        dateCreated: Date
    }, {collection: "event-planner"});

    return PlannerSchema;

};