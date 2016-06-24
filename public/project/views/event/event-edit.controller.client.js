(function() {
    angular
        .module("EventHorizon")
        .controller("EventEditController", EventEditController);


    function EventEditController($routeParams, $location, $rootScope, EventService, UserService) {
        var vm = this;
        var eventId = $routeParams.eid;
        vm.eid = eventId;
        vm.user = $rootScope.currentUser;
        vm.updateEvent = updateEvent;
        vm.deleteEvent = deleteEvent;
        var googleSearchInit = googleSearchInit;
        var verifyEvent = verifyEvent;
        var unfollowAll = unfollowAll;


        function init() {
            EventService
                .findEventById(eventId)
                .then(
                    function(response) {
                        response.data.date = new Date(response.data.date);
                        vm.event = response.data;
                        vm.initialLocation = vm.event.location.address.slice(0);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            googleSearchInit();
        }

        init();

        function googleSearchInit() {

            var input = /** @type {HTMLInputElement} */(
                document.getElementById('event-location'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var place_id = place.place_id;
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                var address = place.formatted_address;
                vm.event.location = {'address': address, 'place_id': place_id, 'lat': lat, 'lng': lng};
            });
        }
        
        function updateEvent() {
            if(verifyEvent(vm.event)) {
                EventService
                    .updateEvent(eventId, vm.event)
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
        
        function deleteEvent() {
            if (confirm('Are you sure you want to delete your account?')) {
                EventService
                    .removeEvent(eventId)
                    .then(
                        function (response) {
                            $location.url("/organization/" + vm.event._organization);
                            // update user profiles
                            unfollowAll();
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        // remove this from follow list of all attendees
        function unfollowAll() {
            for(var i in vm.event.attendees) {
                UserService
                    .unfollowEvent(vm.event.attendees[i], eventId)
                    .then(
                        function(response) {

                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
        }

        function verifyEvent(event) {
            if(!event) {
                vm.error = "Name, location, and date are required";
                return false;
            } else if (!event.name) {
                vm.error = "Name field is required";
                return false;
            } else if(!event.location && !event.date) {
                vm.error = "Location and Date are required";
                return false;
            } else if(!event.location) {
                vm.error = "Location is required";
                return false;
            } else if(!event.date) {
                vm.error = "Date is required";
                return false;
            } else {
                vm.error = "";
                return true;
            }
        }

        

    }

})();