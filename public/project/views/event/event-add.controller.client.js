(function() {
    angular
        .module("EventHorizon")
        .controller("EventAddController", EventAddController);


    function EventAddController($routeParams, $location, $rootScope, EventService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        vm.createEvent = createEvent;

        vm.user = $rootScope.currentUser;


        function init() {

        }

        init();
        
        function createEvent() {
            return;
        }



    }

})();