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
        vm.deleteImage = deleteImage;
        
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
                        // initialize map with location information
                        map_init(vm.event.location.lat, vm.event.location.lng, vm.event.location.place_id);
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
                                vm.ownerUser = true;
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
        }

        init();

        function map_init(lat, lng, placeId) {
            // https://developers.google.com/maps/documentation/javascript/examples/geocoding-place-id
            // thats where I will find what I need
            var mapOptions = {
                center: {lat: lat, lng: lng},
                zoom: 16
            };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var infowindow = new google.maps.InfoWindow();
            var geocoder = new google.maps.Geocoder;
            if(placeId) {
                // query google with place_id
                geocodePlaceId(geocoder, map, infowindow, placeId);
            } else {
                // no placeid associated with location
                var marker = new google.maps.Marker({
                    map: map,
                    position: {lat: lat, lng: lng}
                });
            }

        }

        function geocodePlaceId(geocoder, map, infowindow, placeId) {
            geocoder.geocode({'placeId': placeId}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var place = results[0];
                        if (place.geometry.viewport) {
                            map.fitBounds(place.geometry.viewport);
                        } else {
                            map.setCenter(place.geometry.location);
                            map.setZoom(17);
                        }
                        var marker = new google.maps.Marker({
                            map: map
                        });
                        // Set the position of the marker using the place ID and location.
                        marker.setPlace(/** @type {!google.maps.Place} */ ({
                            placeId: place.place_id,
                            location: place.geometry.location
                        }));
                        marker.setVisible(true);
                        var phone = place.formatted_phone_number;
                        if(!phone) {
                            phone = "";
                        }

                        infowindow.setContent(place.formatted_address);
                        infowindow.open(map, marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
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

        function deleteImage(url) {
            EventService
                .deleteImage(eventId, url)
                .then(
                    function(response) {
                        init();
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

        function goBack() {
            if($rootScope.back) {
                $location.url($rootScope.back);
            } else {
                $location.url("/search");
            }
        }

    }

})();