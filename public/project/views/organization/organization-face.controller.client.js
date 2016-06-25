
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationFaceController", OrganizationFaceController);


    function OrganizationFaceController($routeParams, $location, $rootScope, EventService, OrganizationService, UserService) {
        var vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;

        vm.messageActive = false;
        vm.messageContent = "";
        vm.reviewSubmission = "";
        vm.ownsReview = {};
        vm.toggleMessage = toggleMessage;
        vm.addEvent = addEvent;
        vm.editOrganization = editOrganization;
        vm.sendMessage = sendMessage;
        vm.goToLogin = goToLogin;
        vm.submitReview = submitReview;
        vm.deleteReview = deleteReview;
        vm.goBack = goBack;
        vm.goToEvent = goToEvent;

        vm.user = $rootScope.currentUser;

        /* load all elements of this organization */
        function init() {
            OrganizationService
                .findOrganizationById(organizationId)
                .then(
                    function(response) {
                        // location does not work
                        vm.org = response.data;
                        vm.org.reviews.reverse();
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

        function submitReview() {
            var review = vm.reviewSubmission;
            if(!vm.user) {
                vm.error = "User must be logged in";
                return;
            } else if(!review) {
                vm.error = "Review must not be empty";
                return;
            }
            OrganizationService
                .submitReview(organizationId, vm.user.username, review)
                .then(
                    function(response) {
                        vm.reviewSubmission = "";
                        init();
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
            
        }

        function deleteReview(reviewId, reviewerUsername) {
            if(vm.ownerUser || reviewerUsername === vm.user.username) {
                OrganizationService
                    .deleteReview(organizationId, reviewId)
                    .then(
                        function(response) {
                            init();
                        },
                        function(error) {
                            
                        }
                    );
            } else {
                vm.error = "You do not own this comment";
            }
        }

        function goBack() {
            if(vm.user) {
                $location.url("/user/" + vm.user._id);
            } else {
                $location.url("/search");
            }
        }

        function goToEvent(eventId) {
            $rootScope.back = "/organization/" + organizationId;
            $location.url("/event/" + eventId);
        }

    }

})();
