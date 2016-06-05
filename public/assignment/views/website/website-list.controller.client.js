
(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;

        // load websites
        function init() {
            WebsiteService
                .findWebsitesByUser(uid)
                .then(function(response) {
                    vm.websites = response.data;
                });

        }

        init();

    }

})();