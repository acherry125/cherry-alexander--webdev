(function() {
    angular
        .module("EventHorizon")
        .controller("EventFaceController", EventFaceController);


    function EventFaceController($routeParams, $location, $rootScope, EventService) {
        vm = this;

        vm.user = $rootScope.currentUser;


        function init() {
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

    }

})();