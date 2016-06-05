
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

        function nextPage() {
            vm.page += 1;
            searchPhotos(vm.searchText);
        }

        function previousPage() {
            vm.page -= 1;
            searchPhotos(vm.searchText);
        }
        
        function searchPhotos(searchText) {
            if(searchText) {
                vm.error = "";
                FlickrService
                    .searchPhotos(searchText, vm.page)
                    .then(
                        function(response) {
                            vm.searchText = searchText;
                            data = response.data.replace("jsonFlickrApi(","");
                            data = data.substring(0,data.length - 1);
                            data = JSON.parse(data);
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

        function goBack() {
            $location.url("/user/" + uid
                + "/website/" + wid
                + "/page/" + pid
                + "/widget/" + wgid);
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server
                +"/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(wgid)
                .then(
                    function(response) {
                        var oldWidget = response.data;
                        oldWidget.url = url;
                        WidgetService
                            .updateWidget(wgid, oldWidget)
                            .then(
                                function(response) {
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