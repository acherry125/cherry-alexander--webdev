
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);
    
    function WidgetEditController(WidgetService, $routeParams) {
        var vm = this;
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        vm.title = "Widget Edit"


    }
    
})();
