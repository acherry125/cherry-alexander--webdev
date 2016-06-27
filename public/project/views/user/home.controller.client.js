
(function() {
    angular
        .module("EventHorizon")
        .controller("HomeController", HomeController);


    function HomeController($routeParams, $location, $rootScope, OrganizationService, UserService, EventService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.uid = userId;
        vm.futureEvents = [];
        vm.pastEvents = [];
        vm.addOrganization = addOrganization;
        vm.goToEvent = goToEvent;
        
        
        
        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                        var currentDate = new Date();
                        currentDate = new Date(currentDate.setTime( currentDate.getTime() + 86400000 ));
                        for(var i in vm.user.followed) {
                            var event = vm.user.followed[i];
                            var date = new Date(event.date);
                            if(date > currentDate) {
                                vm.futureEvents.push(event);
                            } else {
                                vm.pastEvents.push(event);
                            }
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            OrganizationService
                .findOrganizationsForPoster(userId)
                .then(
                    function(response) {
                        vm.organizations = response.data.elements;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            // do one for events too
        }
        
        init();
        
        function addOrganization() {
            $location.url("/user/" + userId + "/addOrganization")
        }

        // orders events by reverse date so they render from top to bottom
        function eventComparatorRevDate(event1, event2) {
            return event1.date > event2.date;
        }

        function goToEvent(eventId) {
            $rootScope.back = "/user/" + userId;
            $location.url("/event/" + eventId);
        }


    }

})();
