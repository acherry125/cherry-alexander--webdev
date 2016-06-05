
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        vm.createWebsite = createWebsite;

        // create a website
        function createWebsite() {
            // check to see if correct fields are filled out
            if(vm.website && vm.website.name) {
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