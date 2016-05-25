
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        
        function init() {
            vm.websites = WebsiteService.findWebsiteByUser(uid);
        }
        
        init();
        
    }
    
})();