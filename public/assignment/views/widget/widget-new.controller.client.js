
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams.wid;
        vm.websiteId = wid;
        var pid = $routeParams.pid;
        vm.pageId = pid;
        var type = $routeParams.type;
        vm.title = "New Widget"
        vm.widgetType = type.toLowerCase();
        vm.goBack = goBack;

        function goBack() {
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/new")
        }


    }

})();