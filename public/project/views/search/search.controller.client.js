
(function() {
    angular
        .module("EventHorizon")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, EventService, UserService, $scope, $location) {
        var vm = this;
        vm.searchTerm = "";
        vm.mapDisplay = false;
        vm.goToLogin = goToLogin;
        vm.markers = [];
        vm.visibleEvents = [2];
        // just for rendering, doesn't allow access to anything sensitive
        vm.user = $rootScope.currentUser;

        function init() {
            EventService
                .findAllEvents()
                .then(
                    function(response) {
                        vm.events = response.data.elements;
                        map_init();
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        init();

        function map_init() {
            var mapOptions = {
                center: {lat: 42.34003, lng: -71.089797},
                zoom: 16
            };
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            addMarkers(vm.events, map);

            // Fired when the map becomes idle after panning or zooming.
            google.maps.event.addListener(map, 'idle', function() {
                showVisibleMarkers(map);
            });

            var input = /** @type {HTMLInputElement} */(
                document.getElementById('search'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            var marker = new google.maps.Marker({
                map: map
            });

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace(/** @type {!google.maps.Place} */ ({
                    placeId: place.place_id,
                    location: place.geometry.location
                }));
                marker.setVisible(true);
            });
        }


        function addMarkers(events, map) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var then = new Date(event.date);
                var now = new Date();
                var yearCheck = then.getYear() > now.getYear();
                var monthCheck = then.getYear() === now.getYear()
                    && then.getMonth() > now.getMonth();
                var dayCheck = then.getYear() === now.getYear()
                    && then.getMonth() === now.getMonth()
                    && then.getDate() >= now.getDate();
                // marker for an event yet to come
                if (yearCheck || monthCheck || dayCheck) {
                    var location = event.location;
                    var placeId = location.place_id;
                    var LatLng = new google.maps.LatLng(location.lat, location.lng);
                    var marker = new google.maps.Marker({
                        title: event.name,
                        map: map,
                        icon: "/image/marker.png"
                    });
                    marker.setPlace({
                        location: LatLng,
                        placeId: placeId
                    });

                    var phone = event.phone ? event.phone : "";


                    marker.info = new google.maps.InfoWindow({
                        content: '<div><strong>' + '<a href="#/event/' + event._id + '">' + event.name + '</a></strong><br>' +
                        location.address + '<br>' + phone + '</div>'
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        var marker_map = this.getMap();
                        this.info.open(marker_map, this);
                    });

                    vm.markers.push(marker);
                } else {
                    // to keep number of events == number of markers in arrays
                    vm.markers.push(0);
                }
            }
        }

        function showVisibleMarkers(map) {
            var bounds = map.getBounds(),
                count = 0;
            vm.visibleEvents = [];
            for (var i = 0; i < vm.markers.length; i++) {
                var marker = vm.markers[i];
                if(marker === 0) {
                    continue;
                }
                var lat = marker.place.location.lat();
                var lng = marker.place.location.lng();
                var latLng = new google.maps.LatLng(lat, lng);
                if (bounds.contains(latLng) === true) {
                    vm.visibleEvents.push(vm.events[i]);
                    marker.setMap(map);
                } else {
                    marker.setMap(null);
                }
            }
            vm.visibleEvents.sort(eventComparatorRevDate);
            // outside of angular call so must apply
            $scope.$apply();
        }

        // orders events by reverse date so they render from top to bottom
        function eventComparatorRevDate(event1, event2) {
            return event1.date > event2.date;
        }


        function goToLogin() {
            UserService.setLoginRedirect("/search");
            $location.url("/login");
        }

    }



})();