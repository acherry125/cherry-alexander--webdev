module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        // can use a regex to make the email too
        email: String,
        poster: {type: Boolean, default: false},
        messages: [{from: String, message: String}],
        organizations: [{type: mongoose.Schema.Types.ObjectId, ref: "Organization"}],
        followed: [{name: String, _id: {type: mongoose.Schema.Types.ObjectId, ref: "Event"}}],
        dateCreated: Date
    }, {collection: "event-user"});

    return UserSchema;

};