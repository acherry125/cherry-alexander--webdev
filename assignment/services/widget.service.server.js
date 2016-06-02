module.exports = function(app) {

    var widgets = [

        { "_id": "123", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 2, "text": "GIZMODO"},
        { "_id": "234", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "name": "giz", "widgetType": "IMAGE", "pageId": "321",
            "width": "100",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "name": "giz", "widgetType": "HTML", "pageId": "321",
            "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "name": "giz", "widgetType": "YOUTUBE", "pageId": "321",
            "width": "100",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "name": "giz", "widgetType": "HTML", "pageId": "321",
            "text": "<p>Lorem ipsum</p>"}

    ];

    // respond to widget queries
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    // respond to request for specific widget
    app.get("/api/widget/:widgetId", findWidgetById);

    // handle widget queries
    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        var result = [];
        for(var i in widgets) {
            if (widgets[i].pageId === pid) {
                result.push(widgets[i]);
            }
        }
        res.send(result);
    }

    // find a widget by its id
    function findWidgetById(req, res){
        var wgid = req.params.widgetId;
        for(var i in widgets) {
            if (widgets[i]._id === wgid) {
                res.send(widgets[i]);
                return;
            }
        }
        res.status(404).send("Website with id " + wgid + " not found");
    }

};