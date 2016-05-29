
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);
    
    function WidgetEditController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        var wgid = $routeParams.wgid;
        vm.widgetId =  wgid;
        vm.title = "Widget Edit"
        vm.goBack = goBack

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(wgid));
        }

        init();

        function goBack() {
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/")
        }

    }
    
})();
