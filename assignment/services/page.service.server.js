module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    // respond to page queries
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    // respond to request for specific page
    app.get("/api/page/:pageId", findPageById);
    // respond to request to delete page
    app.delete("/api/page/:pageId", deletePage);
    // respond to request to create page
    app.post("/api/website/:websiteId/page", createPage);


    // handle page queries
    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var result = [];
        for(var i in pages) {
            if (pages[i].websiteId === wid) {
                result.push(pages[i]);
            }
        }
        res.send(result);
    }

    // find a page by its id
    function findPageById(req, res){
        var pid = req.params.pageId;
        for(var i in pages) {
            if (pages[i]._id === pid) {
                res.send(pages[i]);
                return;
            }
        }
        res.status(404).send("Page with id " + pid + " not found");
    }

    // create a new widget
    function deletePage(req, res) {
        var pid = req.params.pageId;
        for (var i in pages) {
            if(pages[i]._id === pid) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Page " + pid + " does not exist");
    }

    // create a new widget
    function createPage(req, res) {
        var wid = req.params.websiteId;
        var newPage = req.body;
        if (!newPage || !newPage.name) {
            res.status(400).send("Page must have name");
            return;
        }
        for(var i in pages) {
            if (pages[i].name === newPage.name && pages[i].websiteId === newPage.websiteId) {
                res.status(400).send("Page name " + newPage.name + " already in use");
                return;
            }
        }
        var id = (new Date()).getTime() + "";
        newPage["_id"] = id;
        newPage["websiteId"] = wid;
        pages.push(newPage);
        res.send(id);
    }

};