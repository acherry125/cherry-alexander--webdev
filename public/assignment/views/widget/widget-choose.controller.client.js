
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
            if (type == "HEADER") {
                createHeader();
            } else if (type == "IMAGE") {
                createImage();
            } else if (type == "YOUTUBE") {
                createYouTube();
            } else if (type == "HTML") {
                createHTML();
            }
        }

        // create a new header
        function createHeader() {
            var header = {"name": "", widgetType: "HEADER",
                "text": "", "size": ""};
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
            var image = {"name": "", widgetType: "IMAGE",
                "text": "", "width": "", "url": ""};
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
            var youtube = {"name": "", widgetType: "YOUTUBE",
                "text": "", "width": "", "url": ""};
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
            var html = {"name": "", widgetType: "HTML" };
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