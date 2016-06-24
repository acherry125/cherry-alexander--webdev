
(function() {
    angular
        .module("EventHorizon")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, EventService, UserService, $location) {
        var vm = this;
        vm.searchTerm = "";
        vm.mapDisplay = false;
        vm.goToLogin = goToLogin;
        vm.markers = [];
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

        function addMarkers(events, map) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var location = event.location;
                var placeId = location.place_id;
                var LatLng = new google.maps.LatLng(location.lat, location.lng);
                var marker = new google.maps.Marker({
                    title: event.name,
                    map: map
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
            }
        }

        function showVisibleMarkers(map) {
            var bounds = map.getBounds(),
                count = 0;

            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];
                if (bounds.contains(marker.getPosition())===true) {
                    // dummy code
                    x = 2;
                    // marker.open()
                } else {
                    // dummy code
                    x = 3;
                    // marker.close()
                }
            }
        }

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

        function goToLogin() {
            UserService.setLoginRedirect("/search");
            $location.url("/login");
        }

    }



})();