module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    // respond to website queries
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    // respond to request for specific website
    app.get("/api/website/:websiteId", findWebsiteById);
    // update website
    app.put("/api/website/:websiteId", updateWebsite);
    // delete website
    app.delete("/api/website/:websiteId", deleteWebsite);
    // create website
    app.post("/api/user/:userId/website", createWebsite);


    // handle website queries
    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var i in websites) {
            if (websites[i].developerId === uid) {
                result.push(websites[i]);
            }
        }
        res.send(result);
    }
    
    // find a website by its id
    function findWebsiteById(req, res){
        var wid = req.params.websiteId;
        for(var i in websites) {
            if (websites[i]._id === wid) {
                res.send(websites[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var update = req.body;
        for (var i in websites) {
            if (websites[i]._id === id) {
                websites[i] = update;
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Website with ID"+ id + "not found");
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === id) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Website with ID"+ id + "not found");
    }
    
    // create a new widget
    function createWebsite(req, res) {
        var uid = req.params.userId;
        var newWebsite = req.body;
        if (!newWebsite || !newWebsite.name) {
            res.status(400).send("Website must have name");
            return;
        }
        for(var i in websites) {
            if (websites[i].name === newWebsite.name && websites[i].userId === newWebsite.userId) {
                    res.status(400).send("Website name " + newWebsite.name + " already in use");
                return;
            }
        }
        var id = (new Date()).getTime() + "";
        newWebsite["_id"] = id;
        newWebsite["developerId"] = uid;
        websites.push(newWebsite);
        res.send(id);
    }
    
};