
(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);
    
    function FlickrImageSearchController(FlickrService, WidgetService, $location, $routeParams) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        var wgid = $routeParams.wgid;
        vm.widgetId =  wgid;
        vm.page = 1;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.goBack = goBack;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;

        // advance the page and reload images
        function nextPage() {
            vm.page += 1;
            searchPhotos(vm.searchText);
        }

        // go back a page and reload images
        function previousPage() {
            vm.page -= 1;
            searchPhotos(vm.searchText);
        }

        // search for photos from flickr
        function searchPhotos(searchText) {
            // check for empty search
            if(searchText) {
                // reset error
                vm.error = "";
                FlickrService
                    // find photos
                    .searchPhotos(searchText, vm.page)
                    .then(
                        function(response) {
                            // allow searchText to be checked
                            vm.searchText = searchText;
                            // parse resposne
                            data = response.data.replace("jsonFlickrApi(","");
                            data = data.substring(0,data.length - 1);
                            data = JSON.parse(data);
                            // set photos to flickr photos
                            vm.photos = data.photos;
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            } else {
                vm.error = "Must enter search terms"
            }

        }

        // go back to widget edit
        function goBack() {
            $location.url("/user/" + uid
                + "/website/" + wid
                + "/page/" + pid
                + "/widget/" + wgid);
        }

        // select a photo to use
        function selectPhoto(photo) {
            // url of photo
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server
                +"/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                // find already saved information of widget
                .findWidgetById(wgid)
                .then(
                    function(response) {
                        var oldWidget = response.data;
                        // add new url
                        oldWidget.url = url;
                        WidgetService
                            // update widget
                            .updateWidget(wgid, oldWidget)
                            .then(
                                function(response) {
                                    // succeed and go back to widget edit
                                    goBack();
                                },
                                function(error) {
                                    vm.error = error.body;
                                }
                            );
                    },
                    function(error) {
                        vm.error = error.body;
                    }
                )

        }

    }
    
    
})();