(function() {
    angular
        .module("EventHorizon")
        .controller("EventEditController", EventEditController);


    function EventEditController($routeParams, $location, $rootScope, UserService) {
        vm = this;
        var eventId = $routeParams.eid;
        vm.eid = eventId;

        vm.user = $rootScope.currentUser;


        function init() {
            
        }

        init();

        

    }

})();