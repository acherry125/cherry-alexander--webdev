(function() {
    angular
        .module("EventHorizon")
        .controller("EventEditController", EventEditController);


    function EventEditController($routeParams, $location, $rootScope, EventService) {
        vm = this;
        var eventId = $routeParams.eid;
        vm.eid = eventId;
        vm.updateEvent = updateEvent;
        vm.user = $rootScope.currentUser;


        function init() {
            
        }

        init();
        
        function updateEvent() {
            return;
        }

        

    }

})();