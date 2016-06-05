module.exports = function(app) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [

        { "_id": "123", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 2, "text": "GIZMODO"},
        { "_id": "234", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "name": "giz", "widgetType": "IMAGE", "pageId": "321",
            "width": "100",
            "url": "http://lorempixel.com/1000/500/"},
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
    // create a new widget
    app.post("/api/page/:pageId/widget", createWidget);
    // delete widget
    app.put("/api/widget/:widgetId", updateWidget);
    // delete widget
    app.delete("/api/widget/:widgetId", deleteWidget);
    // upload image
    app.post("/api/upload", upload.single('myFile'), uploadImage);

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
    function findWidgetById(req, res) {
        var wgid = req.params.widgetId;
        for(var i in widgets) {
            if (widgets[i]._id === wgid) {
                res.send(widgets[i]);
                return;
            }
        }
        res.status(404).send("Website with id " + wgid + " not found");
    }

    // create a new widget
    function updateWidget(req, res) {
        var wgid = req.params.widgetId;
        var update = req.body;
        for (var i in widgets) {
            if(widgets[i]._id === wgid) {
                widgets[i] = update;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Widget " + wgid + " does not exist");
    }

    // create a new widget
    function createWidget(req, res) {
        var pid = req.params.pageId;
        var newWidget = req.body;
        widgets.push(newWidget);
        res.sendStatus(200);
    }

    // create a new widget
    function deleteWidget(req, res) {
        var wgid = req.params.widgetId;
        for (var i in widgets) {
            if(widgets[i]._id === wgid) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Widget " + wgid + " does not exist");
    }

    function uploadImage(req, res) {
        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId      = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
                // reload the page
                res.redirect("/assignment/index.html#/user/"
                    + userId + "/website/" + websiteId + "/page/"
                    + pageId + "/widget/" + widgetId);
                return;
            }
        }

    }

};