
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationFaceController", OrganizationFaceController);


    function OrganizationFaceController($routeParams, $location, $rootScope, EventService, OrganizationService, UserService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;

        vm.messageActive = false;
        vm.messageContent = "";
        vm.reviewSubmission = "";
        vm.toggleMessage = toggleMessage;
        vm.addEvent = addEvent;
        vm.editOrganization = editOrganization;
        vm.sendMessage = sendMessage;
        vm.goToLogin = goToLogin;
        vm.submitComment = submitComment;

        vm.user = $rootScope.currentUser;

        /* load all elements of this organization */
        function init() {
            OrganizationService
                .findOrganizationById(organizationId)
                .then(
                    function(response) {
                        // location does not work
                        vm.org = response.data;
                        // determine if this user own the page
                        if(vm.user && vm.org._poster === vm.user._id) {
                            vm.ownerUser = true;
                        }
                        return UserService.findUserById(vm.org._poster);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
                // set the poster for this organization
                .then(
                    function(response) {
                        vm.posterName = response.data.username;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            // find the events for this organization
            EventService
                .findEventsForOrganization(organizationId)
                .then(
                    function(response) {
                        vm.events = response.data.elements;
                    },
                    function(error) {
                        vm.error = "";
                    }
                )
        }
        
        init();
        
        function toggleMessage() {
            if(vm.user) {
                vm.messageActive = !vm.messageActive;
            } else {
                // should redirect to login page or something
            }
        }

        function addEvent() {
            $location.url("/organization/" + organizationId + "/addEvent");
        }

        function editOrganization() {
            $location.url("/organization/" + organizationId + "/edit");
        }

        function sendMessage() {
            var poster = vm.org._poster;
            if(!vm.messageContent) {
                vm.error = "Message must not be blank";
                return;
            }
            var message = {name: vm.user.username, organization: vm.org.name, message: vm.messageContent};
            UserService
                .sendMessage(poster, vm.user._id, message)
                .then(
                    function(response) {
                        vm.messageContent = "";
                        vm.success = "Message Sent!"
                    },
                    function(error) {
                        vm.error = error.data
                    }
                )
        }

        function goToLogin() {
            UserService.setLoginRedirect("/organization/" + organizationId);
            $location.url("/login");
        }

        function submitComment() {
            var review = vm.reviewSubmission;
            OrganizationService
                .submitComment(organizationId, review)
                .then(
                    function(response) {
                        vm.reviewSubmission = "";
                        vm.org.reviews
                    }, 
                    function() {
                        
                    }
                )
            
        }

    }

})();
