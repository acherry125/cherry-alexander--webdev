
(function() {
    angular
        .module("EventHorizon")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, EventService, UserService, $location) {
        vm = this;
        vm.searchTerm = "";
        vm.mapDisplay = false;
        vm.goToLogin = goToLogin;

        // just for rendering, doesn't allow access to anything sensitive
        vm.user = $rootScope.currentUser;

        function init() {
            EventService
                .findAllEvents()
                .then(
                    function(response) {
                        vm.events = response.data.elements;
                    },
                    function(error) {
                        vm.error = error;
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
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var input = /** @type {HTMLInputElement} */(
                document.getElementById('search'));

            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
            
            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });

            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                infowindow.close();
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
                console.log(place);

                var phone = place.formatted_phone_number;
                if(!phone) {
                    phone = "";
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    place.formatted_address + '<br>' + phone + '</div>');
                infowindow.open(map, marker);
            });
        }

        function goToLogin() {
            UserService.setLoginRedirect("/search");
            $location.url("/login");
        }

    }



})();