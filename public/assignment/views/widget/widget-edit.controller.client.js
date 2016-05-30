
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
        vm.title = "Widget Edit";
        vm.goBack = goBack;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        var validityCheck = validityCheck;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(wgid));
            if (vm.widget.name) {
                vm.backButton = true;
            } else {
                vm.backButton = false;
            }
        }

        init();

        function goBack() {
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/");
        }

        function validityCheck() {
            if (!(vm.widget.name)) {
                vm.missingField = "Widget must have name";
            } else if (vm.widget.widgetType == "HEADER" && !(vm.widget.text && vm.widget.size)) {
                vm.missingField = "Widget must have text and size";
            } else if (vm.widget.widgetType == "IMAGE" && !(vm.widget.text && vm.widget.url && vm.widget.width)) {
                vm.missingField = "Widget must have text, url, and width";
            } else if (vm.widget.widgetType == "YOUTUBE" && !(vm.widget.text && vm.widget.url && vm.widget.width)) {
                vm.missingField = "Widget must have text, url, and width"
            } else {
                vm.missingField = "";
                return true;
            }
        }

        function updateWidget() {
            if (validityCheck()) {
                WidgetService.updateWidget(wgid, vm.widget);
                goBack();
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(wgid);
            goBack();
        }

    }
    
})();
