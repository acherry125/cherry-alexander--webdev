
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        vm.createWebsite = createWebsite;

        function createWebsite() {
            if(vm.website.name) {
                var unique = Date.now();
                unique = unique.toString();
                var website = {"_id": unique, "name": vm.website.name, "description": vm.website.description};
                WebsiteService.createWebsite(uid, website);
                $location.url("/user/" + uid + "/website")
            } else {
                vm.missingName = "Name field must not be empty"
            }
        }

        
    }
    
})();