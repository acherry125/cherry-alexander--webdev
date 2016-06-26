
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
                var address = place.formatted_address;
                vm.org.location = address;
            });
        }

        /* Create this organization */
        function createOrganization() {
            if(verifyOrganization(vm.org)) {
                OrganizationService
                    .createOrganization(posterId, vm.org)
                    .then(
                        function(response) {
                            $location.url("/organization/" + response.data._id);
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
            } else if(org.phone && String(org.phone).length != 10) {
                vm.error = "Phone number must be 10 digits";
            }
            else {
                vm.error = "";
                return true;
            }
        }

    }

})();