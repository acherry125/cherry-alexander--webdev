
module.exports = function(app, requester) {
    
    // respond to page queries
    app.get("/api/flickr", makeRequest);

    key = "aa48e87fb459d9d7dfc3391515792913";

    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
        "&format=json&api_key=API_KEY&text=TEXT&sort=relevance&media=photos&page=PAGE" +
        "&per_page=105";

    /* make search request to flickr */
    function makeRequest(req, res) {
        var term = req.query.term;
        var page = req.query.page;
        url = urlBase.replace("TEXT", term).replace("API_KEY", key).replace("PAGE", page);
        console.log(url);

        requester(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var page = body;
                res.send(page);
                return;
            } else {
                var error = error;
                res.send(page);
                return;
            }
        })
    }

};
