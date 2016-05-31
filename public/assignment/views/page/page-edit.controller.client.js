
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

        /* Initialize the page's information */
        function init() {
            vm.page = angular.copy(PageService.findPageById(pid));
            if(!vm.page) {
                $location.url("/user/" + uid + "/website/" + wid + "/page");
            }
        }

        init();

        function updatePage() {
            if (vm.page.name) {
                var page = { "_id": pid, "name": vm.page.name, "title": vm.page.title, "websiteId": wid };
                PageService.updatePage(pid, page);
                $location.url("user/" + uid + "/website/" + wid + "/page");
            }
            else {
                vm.missingName = "Name field must not be empty"
            }
        }

        function deletePage() {
            PageService.deletePage(pid);
            $location.url("user/" + uid + "/website/" + wid + "/page");
        }

    }

})();