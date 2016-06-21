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
            EventService
                .findEventById(eventId)
                .then(
                    function(response) {
                        vm.event = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        init();
        
        function updateEvent() {
            EventService
                .updateEvent
                .then(
                    function(response) {
                        $location.url("/event/" + eventId);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        

    }

})();