
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
            if(vm.website) {
                var website = { "name": vm.website.name, "description": vm.website.description};
                WebsiteService
                    .createWebsite(uid, website)
                    .then(
                    function(response) {
                        $location.url("/user/" + uid + "/website")
                    },
                    function(error) {
                        vm.error = error.body;
                    }
                );
            } else {
                vm.error = "Name field must not be empty"
            }
        }


    }

})();