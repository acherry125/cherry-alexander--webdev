
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams["wid"];
        vm.websiteId = wid;
        vm.updateWebsite = updateWebsite;
        
        function init() {
            vm.website = WebsiteService.findWebsiteById(wid);
        }

        init();

        function updateWebsite() {
            WebsiteService.updateWebsite(wid, vm.website);
            $location.url("user/" + uid + "/website");
        }

        
    }
    
})();