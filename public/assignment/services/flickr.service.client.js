
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
        

    function FlickrService($http) {


        var api = {
            "searchPhotos": searchPhotos
        };
        
        return api;

        function searchPhotos(searchTerm, page) {
            var url = "/api/flickr?term=" + searchTerm + "&page=" + page;
            return $http.get(url);
        }
    }

})();
