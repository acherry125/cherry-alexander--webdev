
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationEditController", OrganizationEditController);


    function OrganizationEditController($routeParams, $location, $rootScope, EventService, OrganizationService, UserService) {
        var vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        vm.updateOrganization = updateOrganization;
        vm.deleteOrganization = deleteOrganization;
        
        /* defined in config resolve function */
        vm.user = $rootScope.currentUser;
        
        /* initiates page */
        function init() {
            OrganizationService
                .findOrganizationById(organizationId)
                .then(
                    function(response) {
                        vm.org = response.data;
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
            googleSearchInit();
        }
        
        init();

        function googleSearchInit() {

            var input = /** @type {HTMLInputElement} */(
                document.getElementById('org-location'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var address = place.formatted_address;
                vm.org.location = address;
            });
        }
        

        /* Update an organization with new information */
        function updateOrganization() {
            if(verifyOrganization(vm.org)) {
                OrganizationService
                    .updateOrganization(organizationId, vm.org)
                    .then(
                        function(response) {
                            $location.url("/organization/" + organizationId)
                        },
                        function(error) {
                            vm.error = error;
                        }
                    )
            }

        }

        /* verify that organization has all required fields */
        function verifyOrganization(org) {
            if(!org || !org.name) {
                vm.error = "Name field is required";
                return false;
            } else if(org.phone && String(org.phone).length != 10) {
                vm.error = "Phone number must be 10 digits";
            }
            else {
                vm.error = "";
                return true;
            }
        }


        /* deletes the organization */
        function deleteOrganization() {
            if (confirm('Are you sure you want to delete this organization and all of its events?')) {
                OrganizationService
                    .removeOrganization(organizationId)
                    .then(
                        function (response) {
                            deleteAllEvents(organizationId);
                            //$location.url("/user/" + vm.org._poster);
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        /* delete all the events associated with this organization */
        function deleteAllEvents(organizationId) {
            EventService
                .findEventsForOrganization(organizationId)
                .then(
                    function(response) {
                        var events = response.data.elements;
                        for(var i in events) {
                            deleteEvent(events[i]._id);
                        }
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
        }

        /* deletes an individual event */
        function deleteEvent(eventId) {
            EventService
                .findEventById(eventId)
                .then(
                    function(response) {
                        // update user profiles
                        var followers = response.data.attendees;
                        unfollowAll(eventId, followers);
                        return EventService.removeEvent(eventId)
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
                .then(
                    function(response) {
                        console.log(event.name);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        /* removes an event from the followed list of a group of attendees */
        function unfollowAll(eventId, attendees) {
            for(var i in attendees) {
                UserService
                    .unfollowEvent(attendees[i], eventId)
                    .then(
                        function(response) {
                            console.log("succesfully unfollowed");
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            }
            $location.url("/user/" + vm.org._poster);
        }

    }

})();
