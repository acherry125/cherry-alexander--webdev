
(function() {

    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;

        vm.createPage = createPage;

        // create a page
        function createPage() {
            // check for the required fields
            if(vm.page && vm.page.name) {
                var page = { "name": vm.page.name, "title": vm.page.title};
                PageService
                    .createPage(wid, page)
                    .then(
                        function(response) {
                            $location.url("/user/" + uid + "/website/" + wid + "/page")
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