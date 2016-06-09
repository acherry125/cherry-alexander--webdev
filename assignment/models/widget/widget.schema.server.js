module.exports = function(mongoose) {

    var WidgetSchema = mongoose.Schema({
        _page: String,
        type: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        // might be a problem
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: (new Date())},

    }, {collection: "widget"});

    return WidgetSchema;

};