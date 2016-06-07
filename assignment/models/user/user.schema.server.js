module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        // can use a regex to make the email too
        email: String
        /*
        dateCreate: {type: Date, default: Date.now()},
        dateUpdated: Data
        */
    }, /* this will set the collection name */ {collection: "user"});

    return UserSchema;

};