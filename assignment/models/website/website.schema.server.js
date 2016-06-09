module.exports = function(mongoose) {

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: "Page"}],
        dateCreated: {type: Date, default: (new Date())},
        dateCreated: {type: Date, default: (new Date())},
    }, {collection: "website"});
    
    return WebsiteSchema;

};