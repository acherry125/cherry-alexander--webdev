
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
        

    function FlickrService($http) {


        var api = {
            "searchPhotos": searchPhotos
        };
        
        return api;

        function searchPhotos(searchTerm) {
            var url = "/api/flickr?term=" + searchTerm;
            return $http.get(url);
        }
    }

})();
