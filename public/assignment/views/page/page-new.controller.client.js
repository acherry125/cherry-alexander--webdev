
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

        function createPage() {
            if(vm.page.name) {
                unique = Date.now();
                unique = unique.toString();
                var page = {"_id": unique, "name": vm.page.name, "title": vm.page.title};
                PageService.createPage(wid, page);
                $location.url("/user/" + uid + "/website/" + wid + "/page")
            } else {
                vm.missingName = "Name field must not be empty"
            }
        }


    }

})();