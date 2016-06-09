module.exports = function(mongoose) {

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "Widget"}],
        dateCreated: {type: Date, default: (new Date())},
    }, {collection: "page"});

    return PageSchema;

};