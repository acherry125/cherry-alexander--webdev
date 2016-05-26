
(function() {

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(wid);
        }

        init();

    }

})();