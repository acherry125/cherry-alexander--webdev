module.exports = function(mongoose) {

    var OrganizationSchema = mongoose.Schema({
        _poster: {type: mongoose.Schema.Types.ObjectId, ref: "EventUser"},
        name: String,
        phone: String,
        location: String,
        description: String,
        reviews: [{from: String, review: String}],
        dateCreated: Date
    }, {collection: "event-organization"});

    return OrganizationSchema;

};