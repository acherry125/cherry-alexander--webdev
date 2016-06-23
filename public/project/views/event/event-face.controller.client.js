(function() {
    angular
        .module("EventHorizon")
        .controller("EventFaceController", EventFaceController);


    function EventFaceController($routeParams, $location, $rootScope, EventService, OrganizationService, UserService) {
        var vm = this;
        var eventId = $routeParams.eid;
        vm.eid = eventId;
        vm.editEvent = editEvent;
        vm.followEvent = followEvent;
        vm.unfollowEvent = unfollowEvent;
        vm.goToLogin = goToLogin;
        
        vm.user = $rootScope.currentUser;


        function init() {
            if(!vm.user) {
                vm.notFollowed = true;
            }
            EventService
                .findEventById(eventId)
                .then(
                    function(response) {
                        if(response.data.date) {
                            response.data.date = new Date(response.data.date).toDateString();
                        }
                        vm.event = response.data;
                        // for rendering
                        vm.followNumber = vm.event.attendees.length;
                        var organizationId = vm.event._organization;
                        return OrganizationService.findOrganizationById(organizationId);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
                .then(
                    function(response) {
                        vm.orgName = response.data.name;
                        if(vm.user) {
                            if (vm.user._id === response.data._poster) {
                                vm.authorizedUser = true;
                            }
                            var followed = vm.user.followed;
                            // redundant but stops page from loading the wrong button first
                            vm.notFollowed = true;
                            for(var i in vm.user.followed) {
                                if(followed[i]._id === eventId) {
                                    vm.followed = true;
                                    vm.notFollowed = false;
                                    break;
                                }
                            }
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            map_init();
        }

        init();

        function map_init() {
            var mapOptions = {
                center: {lat: 42.34003, lng: -71.089797},
                zoom: 16
            };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map,
                position: {lat: 42.34003, lng: -71.089797}
            });
        }

        function editEvent() {
            $location.url("/event/" + eventId + "/edit")
        }

        function followEvent() {
            if(!vm.user) {
                // redirect to login or something
                return;
            }
            UserService
                .followEvent(vm.user._id, {name: vm.event.name, _id: eventId, date: vm.event.date })
                .then(
                    function(response) {
                        // again, very redundant but needed to make buttons load right
                        vm.followed = true;
                        vm.notFollowed = false;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            EventService
                .addFollower(eventId, vm.user._id)
                .then(
                    function(response) {
                        vm.followNumber += 1;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function unfollowEvent() {
            UserService
                .unfollowEvent(vm.user._id, eventId)
                .then(
                    function(response) {
                        // redundant, but necessary, see other comments
                        vm.followed = false;
                        vm.notFollowed = true;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            EventService
                .removeFollower(eventId, vm.user._id)
                .then(
                    function(response) {
                        vm.followNumber -= 1;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function goToLogin() {
            UserService.setLoginRedirect("/event/" + eventId);
            $location.url("/login");
        }

    }

})();