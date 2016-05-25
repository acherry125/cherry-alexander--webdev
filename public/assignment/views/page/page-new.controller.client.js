
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

        function createPage(name, description) {
            if(name) {
                unique = Date.now();
                unique = unique.toString();
                var page = {"_id": unique, "name": name};
                PageService.createPage(uid, page);
                $location.url("/user/" + uid + "/website/" + wid + "/page")
            } else {
                vm.missingName = "New Page must be named"
            }
        }


    }

})();