
(function() {
    angular
        .module("EventHorizon")
        // naming controller and binding it to function
        .controller("LandingPageController", LandingPageController);

    function LandingPageController($rootScope) {
        var vm = this;
        vm.expanded= false;
        vm.toggleExpand = toggleExpand;

        // just for rendering, doesn't allow access to anything sensitive
        vm.user = $rootScope.currentUser;
        
        function toggleExpand() {
            vm.expanded = !vm.expanded;
        }
        
    }
})();
