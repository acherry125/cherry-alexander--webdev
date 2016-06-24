
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationAddController", OrganizationAddController);


    function OrganizationAddController($routeParams, $location, $rootScope, OrganizationService) {
        var vm = this;
        var posterId = $routeParams.uid;
        vm.uid = posterId;
        vm.createOrganization = createOrganization;
        vm.user = $rootScope.currentUser;

        function init() {
            googleSearchInit();
            // put check in to make sure this is a poster
            return;
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
                var place_id = place.placeId;
                var address = place.formatted_address;
                vm.event.location = {'address': address, 'place_id': place_id};
            });
        }

        /* Create this organization */
        function createOrganization() {
            if(verifyOrganization(vm.org)) {
                OrganizationService
                    .createOrganization(posterId, vm.org)
                    .then(
                        function(response) {
                            $location.url("/user/" + posterId);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        /* verify that organization has all required fields */
        function verifyOrganization(org) {
            if(!org || !org.name) {
                vm.error = "Name field is required";
                return false;
            } else {
                vm.error = "";
                return true;
            }
        }

    }

})();