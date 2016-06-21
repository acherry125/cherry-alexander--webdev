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
            if(verifyEvent(vm.event)) {
                EventService
                    .createEvent(organizationId, vm.event)
                    .then(
                        function(response) {
                            $location.url("/organization/" + organizationId);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function verifyEvent(event) {
            if(!event || !event.name) {
                vm.error = "Name field is required";
            } else {
                vm.error = "";
            }
        }



    }

})();