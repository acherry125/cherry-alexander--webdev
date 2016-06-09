module.exports = function(app) {

    var pageModel = models.pageModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    /* respond to page queries */
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    // respond to request for specific page
    app.get("/api/page/:pageId", findPageById);
    // respond to request to delete page
    app.put("/api/page/:pageId", updatePage);
    // respond to request to delete page
    app.delete("/api/page/:pageId", deletePage);
    // respond to request to create page
    app.post("/api/website/:websiteId/page", createPage);


    /* handle page queries */
    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(userId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(404).send("Cannot search for pages right now")
                }
            );
    }

    /* find a page by its id */
    function findPageById(req, res){
        var pageId = req.params.pageId;
        for(var i in pages) {
            if (pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.status(404).send("Page with id " + pageId + " not found");
    }

    /* update a page */
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        if(page && page.name) {
            pageModel
                .updatePage(pageId, page)
                .then(
                    function(response) {
                        res.sendStatus(200);
                    },
                    function(error) {
                        res.status(400).send("Page " + wid + " cannot be updated")
                    }
                );
        } else {
            res.status(400).send("Page must have a name");
        }
    }
    
    /* create a new widget */
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function(page) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("Could not delete page, please try again");
                }
            );
    }

    /* create a new widget */
    function createPage(req, res) {
        var wid = req.params.websiteId;
        var newPage = req.body;
        // check if page has name
        if (!newPage || !newPage.name) {
            res.status(400).send("Page must have name");
            return;
        }
        // check if website by this name already exists
        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages) {
                    for(var i in pages) {
                        if(pages[i].name === newPage.name) {
                            res.status(400).send("Page name " + newPage.name + " already in use");
                            return;
                        }
                    }
                    // create the website
                    createPageHelper(wid, newPage, res);
                },
                function(error) {
                    res.status(400).send("Could not create page, please try again");
                }
            );
    }

    // creates a page once the checks have been made
    function createPageHelper(wid, newPage, res) {
        pageModel
            .createPage(wid, newPage)
            .then(
                function(page) {
                    res.send(page._id);
                },
                function(error) {
                    res.status(400).send("Could not create page, please try again");
                }
            );
    }


};