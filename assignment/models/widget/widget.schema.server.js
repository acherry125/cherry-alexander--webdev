module.exports = function(mongoose) {

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: "Page"},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        // might be a problem
        width: {type: Number, default: 100},
        height: {type: Number, default: 100},
        rows: {type: Number, default: 1},
        size: {type: Number, default: 1},
        class: String,
        icon: String,
        deletable: {type: Boolean, default: false},
        formatted: {type: Boolean, default: false},
        dateCreated: Date,
        order: Number
    }, {collection: "widget"});

    return WidgetSchema;

};