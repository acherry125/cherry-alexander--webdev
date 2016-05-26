
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        vm.fixYoutube = fixYoutube;
        
        vm.lin = "https://www.youtube.com/embed/AM2Ivdi9c4E"
        
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pid);
        }

        init();

        function fixYoutube(link) {
            var url = link.replace("watch?v=", "v/");
            url = url.replace("&feature=youtu.be", "");
            return url;
        }

        vm.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

    }

})();