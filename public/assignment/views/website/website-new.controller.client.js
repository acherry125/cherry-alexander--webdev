
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if(name) {
                var unique = Date.now();
                unique = unique.toString();
                var website = {"_id": unique, "name": name};
                WebsiteService.createWebsite(uid, website);
                $location.url("/user/" + uid + "/website")
            } else {
                vm.missingName = "Name field must not be empty"
            }
        }

        
    }
    
})();