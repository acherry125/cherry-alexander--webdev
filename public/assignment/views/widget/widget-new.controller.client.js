
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams.wid;
        vm.websiteId = wid;
        var pid = $routeParams.pid;
        vm.pageId = pid;
        var type = $routeParams.type;
        vm.widgetType = type;
    
    }

})();