
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController", WidgetChooseController);

    function WidgetChooseController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;

        vm.createWidget = createWidget;
        var createHeader = createHeader;
        var createImage = createImage;
        var createYouTube = createYouTube;

        // create a new widget
        function createWidget(type) {
            types = ["HEADING", "IMAGE", "YOUTUBE", "IMAGE", "YOUTUBE", "HTML", "INPUT"];
            if (types.indexOf(type) == -1) {
                $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget");
            } else {
                var widget = {"type": type};
                WidgetService
                    .createWidget(pid, widget)
                    .then(
                        function(response) {
                            var id = response.data;
                            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        // create a new header
        function createHeader() {
            WidgetService
                .createWidget(pid, header)
                .then(
                    function(response) {
                        var id = response.data;
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        // create a new image
        function createImage() {
            var image = {"type": "IMAGE"};
            WidgetService
                .createWidget(pid, image)
                .then(
                    function(response) {
                        var id = response.data;
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                );
        }

        // create a new Youtube Widget
        function createYouTube() {
            var youtube = {"type": "YOUTUBE"};
            WidgetService
                .createWidget(pid, youtube)
                .then(
                    function(response) {
                        var id = response.data;
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                );
        }

        // create a new Youtube Widget
        function createHTML() {
            var html = {"type": "HTML" };
            WidgetService
                .createWidget(pid, html)
                .then(
                    function(response) {
                        var id = response.data;
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                );
        }

    }

})();