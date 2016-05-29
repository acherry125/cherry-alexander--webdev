
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

        function pickWidgetType(type) {
            var unique = Date.now();
            unique = unique.toString();
            $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/new/" + type.toLowerCase());
        }

        function createWidget(type) {
            var unique = Date.now();
            unique = unique.toString();
            if (type == "HEADER") {
                createHeader(unique);
            } else if (type == "IMAGE") {
                createImage(unique);
            } else if (type == "YOUTUBE") {
                createYouTube(unique);
            }
        }

        function createHeader(id) {
            var header = {"_id": id, "name": "", widgetType: "HEADER",
                "text": "", "size": ""};
            WidgetService.createWidget(pid, header);
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id)
        }

        function createImage(id) {
            var image = {"_id": id, "name": "", widgetType: "IMAGE",
                "text": "", "width": "", "url": ""};
            WidgetService.createWidget(pid, image);
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id)
        }

        function createYouTube(id) {
            var youtube = {"_id": id, "name": "", widgetType: "YOUTUBE",
                "text": "", "width": "", "url": ""};
            WidgetService.createWidget(pid, youtube);
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/" + id)
        }
        
    }
    
})();