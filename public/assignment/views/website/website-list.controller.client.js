
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        vm = this;
        var id = $routeParams["uid"];
        vm.userId =  id;
    }
    
})();