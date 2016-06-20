
(function() {
    angular
        .module("EventHorizon")
        // naming controller and binding it to function
        .controller("LandingPageController", LandingPageController);

    function LandingPageController($rootScope) {
        vm = this;
        vm.expanded= false;
        vm.toggleExpand = toggleExpand;
        
        function toggleExpand() {
            vm.expanded = !vm.expanded;
        }
        
    }
})();
