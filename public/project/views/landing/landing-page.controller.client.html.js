
(function() {
    angular
        .module("StockShare")
        // naming controller and binding it to function
        .controller("LandingPageController", LandingPageController);

    function LandingPageController() {
        vm = this;
        vm.expanded= false;
        vm.toggleExpand = toggleExpand;
        
        function toggleExpand() {
            vm.expanded = !vm.expanded;
        }
        
    }
})();
