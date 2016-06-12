module.exports = function(app, models) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    var widgets = [

        { "_id": "123", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 2, "text": "GIZMODO"},
        { "_id": "234", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "name": "giz", "widgetType": "IMAGE", "pageId": "321",
            "width": 100,
            "url": "http://lorempixel.com/1000/500/"},
        { "_id": "456", "name": "giz", "widgetType": "HTML", "pageId": "321",
            "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "name": "giz", "widgetType": "YOUTUBE", "pageId": "321",
            "width": 100,
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "name": "giz", "widgetType": "HTML", "pageId": "321",
            "text": "<p>Lorem ipsum</p>"}

    ];

    // respond to widget queries
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    // respond to request for specific widget
    app.get("/api/widget/:widgetId", findWidgetById);
    // create a new widget
    app.post("/api/page/:pageId/widget", createWidget);
    // reorder a widget
    app.put("/api/page/:pageId/widget", reorderWidget);
    // delete widget
    app.put("/api/widget/:widgetId", updateWidget);
    // delete widget
    app.delete("/api/widget/:widgetId", deleteWidget);
    // upload image
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    // handle widget queries
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send("Cannot search for widgets right now")
                }
            );
    }

    // find a widget by its id
    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;
        widgetModel
            .findWidgetById(wgid)
            .then(
                function(widget) {
                    if(widget === null) {
                        res.status(404).send("Widget " + wgid + " not found")
                    } else {
                        res.json(widget);
                    }
                },
                function(error) {
                    res.status(404).send("Widget " + wgid + " not found")
                }
            );
    }

    // reorder the widget
    function reorderWidget(req, res) {
        var pid = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;
        pageModel
            .reorderWidgetsInPage(pid, start, end)
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send(error.data);
                }
            );
    }

    // create a new widget
    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var widget = req.body;

        if(widget && widget.name) {
            widgetModel
                .updateWidget(wgid, widget)
                .then(
                    function(response) {
                        res.sendStatus(200);
                    },
                    function(error) {
                        res.status(400).send("Widget " + wgid + " cannot be updated")
                    }
                );
        } else {
            res.status(400).send("Widget must have a name");
        }
    }

    // create a new widget
    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        // create the widget
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function(widget) {
                    res.send(widget._id);
                },
                function(error) {
                    res.status(400).send("Could not create widget, please try again");
                }
            );
    }

    // create a new widget
    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;
        widgetModel
            .deleteWidget(wgid)
            .then(
                function(widget) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send("Could not delete widget, please try again");
                }
            );
    }

    function uploadImage(req, res) {

        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId      = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/assignment/index.html#/user/"
                + userId + "/website/" + websiteId + "/page/"
                + pageId + "/widget/" + widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;



        for (var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
                widgets[i].width = Number(width);
                // reload the page
                res.redirect("/assignment/index.html#/user/"
                    + userId + "/website/" + websiteId + "/page/"
                    + pageId + "/widget/" + widgetId);
                return;
            }
        }

    }

};