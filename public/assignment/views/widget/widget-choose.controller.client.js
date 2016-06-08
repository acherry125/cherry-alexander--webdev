
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
            var unique = Date.now();
            unique = unique.toString();
            if (type == "HEADER") {
                createHeader(unique);
            } else if (type == "IMAGE") {
                createImage(unique);
            } else if (type == "YOUTUBE") {
                createYouTube(unique);
            } else if (type == "HTML") {
                createHTML(unique);
            }
        }

        // create a new header
        function createHeader(id) {
            var header = {"_id": id, "name": "", widgetType: "HEADER",
                "text": "", "size": ""};
            WidgetService
                .createWidget(pid, header)
                .then(
                    function(response) {
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                )
        }

        // create a new image
        function createImage(id) {
            var image = {"_id": id, "name": "", widgetType: "IMAGE",
                "text": "", "width": "", "url": ""};
            WidgetService
                .createWidget(pid, image)
                .then(
                    function(response) {
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                );
        }

        // create a new Youtube Widget
        function createYouTube(id) {
            var youtube = {"_id": id, "name": "", widgetType: "YOUTUBE",
                "text": "", "width": "", "url": ""};
            WidgetService
                .createWidget(pid, youtube)
                .then(
                    function(response) {
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                );
        }

        // create a new Youtube Widget
        function createHTML(id) {
            var html = {"_id": id, "name": "", widgetType: "HTML" };
            WidgetService
                .createWidget(pid, html)
                .then(
                    function(response) {
                        $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id);
                    },
                    function(error) {
                        vm.error(error);
                    }
                );
        }

    }

})();