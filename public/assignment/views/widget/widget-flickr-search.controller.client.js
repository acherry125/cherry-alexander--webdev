
(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);
    
    function FlickrImageSearchController(FlickrService) {
        var vm = this;
        
        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        vm.photos = reponse.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
    
    
})();