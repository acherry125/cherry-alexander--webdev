
module.exports = function(app, requester) {
    
    // respond to page queries
    app.get("/api/flickr", makeRequest);

    key = "aa48e87fb459d9d7dfc3391515792913";

    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
        "&format=json&api_key=API_KEY&text=TEXT";
    
    function makeRequest(req, res) {
        term = req.query.term;
        url = urlBase.replace("TEXT", term).replace("API_KEY", key);
        console.log(url);

        requester(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var page = body;
                res.send(page);
                console.log(page);
                return;
            } else {
                var error = error;
                res.send(page);
                console.log(error);
                return;
            }
        })
    }

};
