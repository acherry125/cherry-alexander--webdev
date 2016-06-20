module.exports = function(mongoose) {

    var OrganizationSchema = mongoose.Schema({
        name: String,
        phone: String,
        location: String,
        description: String,
        poster: {type: mongoose.Schema.Types.ObjectId, ref: "EventUser"},
        dateCreated: Date
    }, {collection: "event-organization"});

    return OrganizationSchema;

};