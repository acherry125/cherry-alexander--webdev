
(function() {

    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId = uid;
        var wid = $routeParams.wid;
        vm.websiteId = wid;
        var pid = $routeParams.pid;
        vm.pageId = pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = angular.copy(Page.findPageById(pid));
        }

        init();

        function updatePage() {
            if (vm.page.name) {
                var page = { "_id": pid, "name": vm.page.name, "developerId": uid };
                PageService.updatePage(pid, page);
                $location.url("user/" + uid + "/website/" + wid + "/page");
            }
            else {
                vm.missingName = "Page must be named"
            }
        }

        function deletePage() {
            PageService.deletePage(pid);
            $location.url("user/" + uid + "/website/" + wid + "/page");
        }

    }

})();