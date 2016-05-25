
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams["wid"];
        vm.websiteId = wid;
        
        function init() {
            vm.website = WebsiteService.findWebsiteById(wid);
        }
        
        init();
        
    }
    
})();