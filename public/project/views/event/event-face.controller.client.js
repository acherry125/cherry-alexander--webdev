(function() {
    angular
        .module("EventHorizon")
        .controller("EventFaceController", EventFaceController);


    function EventFaceController($routeParams, $location, $rootScope, EventService, OrganizationService) {
        vm = this;
        var eventId = $routeParams.eid;
        vm.eid = eventId;
        vm.editEvent = editEvent;

        vm.user = $rootScope.currentUser;


        function init() {
            EventService
                .findEventById(eventId)
                .then(
                    function(response) {
                        vm.event = response.data;
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
                        if(vm.user._id === response.data._poster) {
                            vm.authorizedUser = true;
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

    }

})();