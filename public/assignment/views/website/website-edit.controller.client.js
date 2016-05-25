
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams.wid;
        vm.websiteId = wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        
        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(wid));
        }

        init();

        function updateWebsite() {
            if (vm.website.name) {
                var website = { "_id": wid, "name": vm.website.name, "developerId": uid };
                WebsiteService.updateWebsite(wid, website);
                $location.url("user/" + uid + "/website");
            }
            else {
                vm.missingName = "Website must be named"
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(wid);
            $location.url("user/" + uid + "/website");
        }
        
    }
    
})();