module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        // can use a regex to make the email too
        email: String,
        poster: {type: Boolean, default: false},
        dateCreated: Date
    }, {collection: "event-user"});

    return UserSchema;

};