
(function() {
    angular
        .module("EventHorizon")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, EventService, UserService, $scope, $location) {
        var vm = this;

        /* API */
        // initiate map
        var mapInit = mapInit;
        // add markers to map
        var addMarkers = addMarkers;
        // show all markers and add to event list
        var showVisibleMarkers = showVisibleMarkers;
        // compare two events based on their date (reversed)
        var eventComparatorRevDate = eventComparatorRevDate;
        vm.goToLogin = goToLogin;
        vm.searchName = searchName;

        /* initial conditions */
        vm.searchTerm = "";
        vm.mapDisplay = false;
        vm.markers = [];
        vm.visibleEvents = [2];
        vm.searchType = "location";
        // just for rendering, doesn't allow access to anything sensitive
        vm.user = $rootScope.currentUser;

        // initialize the page
        function init() {
            EventService
                .findAllEvents()
                .then(
                    function(response) {
                        vm.events = response.data.elements;
                        for(var i in vm.events) {
                            var event = vm.events[i];
                            event.formattedDate = new Date(event.date).toDateString();
                        }
                        mapInit();
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }

        // initial call
        init();

        // initialize the map
        function mapInit() {

            var mapOptions = {
                center: {lat: 42.347, lng: -71.081797},
                zoom: 13
            };
            // create map
            var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            // add markers to map
            addMarkers(vm.events, map);

            // Fired when the map becomes idle after panning or zooming.
            google.maps.event.addListener(map, 'idle', function() {
                showVisibleMarkers(map);
            });

            // connect to search bar
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
                var currentDate = new Date();
                currentDate = new Date(currentDate.setTime( currentDate.getTime() - 86400000 ));
                if(then > currentDate) {
                    var location = event.location;
                    var placeId = location.place_id;
                    var LatLng = new google.maps.LatLng(location.lat, location.lng);
                    // the marker to place
                    var marker = new google.maps.Marker({
                        title: event.name,
                        map: map,
                        icon: "/image/marker.png"
                    });
                    // position the marker
                    marker.setPlace({
                        location: LatLng,
                        placeId: placeId
                    });

                    var desc = event.description ? event.description : "";

                    marker.info = new google.maps.InfoWindow({
                        content: '<div><strong>' + '<a href="#/event/' + event._id + '">' + event.name + '</a></strong><br>' +
                        location.address + '<br>' + desc + '</div>'
                    });

                    // open infowindow on click
                    google.maps.event.addListener(marker, 'click', function() {
                        var marker_map = this.getMap();
                        this.info.open(marker_map, this);
                    });
                    // add to markers
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
            // reset events
            vm.visibleEvents = [];
            // add markers to map within the map bounds and add to search results
            for (var i = 0; i < vm.markers.length; i++) {
                var marker = vm.markers[i];
                if(marker === 0) {
                    continue;
                }
                var lat = marker.place.location.lat();
                var lng = marker.place.location.lng();
                var latLng = new google.maps.LatLng(lat, lng);
                if (bounds.contains(latLng) === true) {
                    var event = vm.events[i];
                    vm.visibleEvents.push(vm.events[i]);
                    marker.setMap(map);
                } else {
                    marker.setMap(null);
                }
            }
            // sort by date
            vm.visibleEvents.sort(eventComparatorRevDate);
            // outside of angular call so must apply
            $scope.$apply();
        }

        // orders events by reverse date so they render from top to bottom
        function eventComparatorRevDate(event1, event2) {
            return event1.date > event2.date;
        }

        // go to login page
        function goToLogin() {
            UserService.setLoginRedirect("/search");
            $location.url("/login");
        }

        // rudimentary search by name
        function searchName() {
            if(!vm.searchTerm) {
                var futureEvents = [];
                var currentDate = new Date();
                currentDate = new Date(currentDate.setTime( currentDate.getTime() - 86400000 ));
                for(var i in vm.events) {
                    if(new Date(vm.events[i].date) > currentDate) {
                        futureEvents.push(vm.events[i]);
                    }
                }
                vm.visibleEvents = futureEvents;
                return;
            }
            vm.visibleEvents = [];
            var terms = vm.searchTerm.split(" ");
            for(var i in vm.events) {
                var nameTerms = vm.events[i].name.split(" ");
                for(var j in nameTerms) {
                    if(terms.indexOf(nameTerms[j]) > -1) {
                        vm.visibleEvents.push(vm.events[i]);
                        break;
                    }
                }
            }
            vm.visibleEvents.sort(eventComparatorRevDate);
        }


    }


})();