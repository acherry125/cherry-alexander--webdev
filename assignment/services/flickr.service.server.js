
module.exports = function(app, requester) {
    
    // respond to page queries
    app.get("/api/flickr", makeRequest);

    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
        "&format=json&api_key=API_KEY&text=TEXT";
    
    function makeRequest(req, res) {
        term = req.query.term;

        requester(urlBase.replace("TEXT", term), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var page = body;
                console.log(page);
            } else {
                var error = error;
                console.log(error);
            }
        })
    }

};
