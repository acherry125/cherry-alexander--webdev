
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "";
    var secret = "";
    

    function FlickrService($http) {


        var api = {
            "searchPhotos": searchPhotos
        };
        
        return api;

        function searchPhotos(searchTerm) {
            var url = "/api/flickr?term=" + searchTerm;
            $http.get(url);

        }

    }

})();
