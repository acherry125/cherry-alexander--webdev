module.exports = function(mongoose) {

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        name: String,
        description: String,
        pages: String,
        dateCreated: String
    }, {collection: "website"});
    
    return WebsiteSchema;

};