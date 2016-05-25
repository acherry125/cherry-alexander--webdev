
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams) {
        vm = this;
        var id = $routeParams["uid"];
        vm.userId =  id;
    }
    
})();