
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
        
        vm.pickWidgetType = pickWidgetType;

        function pickWidgetType(type) {
            $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/new/" + type);
        }
    }
    
})();