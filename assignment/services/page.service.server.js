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

};