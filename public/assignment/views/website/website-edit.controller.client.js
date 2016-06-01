
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
            WebsiteService
                .findWebsiteById(wid)
                .then(function(response) {
                    if(response.data.name) {
                        vm.website = response.data;
                    } else {
                        $location.url("/user/" + uid + "/website/");
                    }
                });
        }

        init();

        function updateWebsite() {
            if (vm.website.name) {
                var website = { "_id": wid, "name": vm.website.name,
                    "description": vm.website.description, "developerId": uid };
                WebsiteService.updateWebsite(wid, website);
                $location.url("user/" + uid + "/website");
            }
            else {
                vm.missingName = "Name field must not be empty  "
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(wid);
            $location.url("user/" + uid + "/website");
        }

    }

})();