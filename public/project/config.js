(function() {
    angular
        .module("EventHorizon")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            // landing page
            .when("/landing", {
                templateUrl: "views/landing/landing-page.view.client.html",
                // married to landing-page
                controller: "LandingPageController",
                controllerAs: "model"
            })
            // landing page
            .when("/", {
                templateUrl: "views/landing/landing-page.view.client.html",
                // married to logincontroller
                controller: "LandingPageController",
                controllerAs: "model"
            })
            // login
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                // married to logincontroller
                controller: "LoginController",
                controllerAs: "model"
            })
            // register
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            // home page
            .when("/user/:uid", {
                templateUrl: "views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInSensitive }
            })
            // account
            .when("/user/:uid/account", {
                templateUrl: "views/user/account.view.client.html",
                controller: "AccountController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInSensitive }
            })
            // messages
            .when("/user/:uid/messages", {
                templateUrl: "views/user/messages.view.client.html",
                controller: "UserMessagesController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInSensitive }
            })
            // experiment map
            .when("/map", {
                templateUrl: "views/map/map.view.client.html",
                controller: "MapController",
                controllerAs: "model"
            })
            // search page
            .when("/search", {
                templateUrl: "views/landing/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInPublic }
            })
            // event public page
            .when("/event/:eid", {
                templateUrl: "views/event/event-face.view.client.html",
                controller: "EventFaceController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInPublic }
                // implement logic to check if user is poster and runs this event loggedIn: checkLoggedIn 
            })
            // event edit page
            .when("/event/:eid/edit", {
                templateUrl: "views/event/event-edit.view.client.html",
                controller: "EventEditController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInPublic }
            })
            // organization public page
            .when("/organization/:oid", {
                templateUrl: "views/organization/organization-face.view.client.html",
                controller: "OrganizationFaceController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInPublic }
            })
            // organization edit page
            .when("/organization/:oid/edit", {
                templateUrl: "views/organization/organization-edit.view.client.html",
                controller: "OrganizationEditController",
                controllerAs: "model",
                resolve: { loggedIn: loggedInPublic }
                // implement logic to check if user is poster and owns this organization loggedIn: checkLoggedIn
            });
    

        function loggedInPublic($q, $timeout, $http, $location, $rootScope, $route, UserService) {
            var deferred = $q.defer();
            var uid = $route.current.params.uid;

            UserService
                .checkLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        // not logged in
                        if(user == '0') {
                            deferred.resolve();
                            $rootScope.currentUser = null;
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    // error from server
                    function(error) {
                        deferred.resolve();
                        $rootScope.currentUser = null;
                    }
                );
            
        }

        // how to tell if user is logged in
        function loggedInSensitive($q, $timeout, $http, $location, $rootScope, $route, UserService) {

            var deferred = $q.defer();

            var uid = $route.current.params.uid;

            UserService
                .checkLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        // not logged in
                        if(user == '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/");
                            // change location here $location
                            // trying to access someone else's account    
                        } else if (user._id != uid) {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                            // logged into correct account    
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    // error from server
                    function(error) {
                        deferred.reject();
                        $rootScope.currentUser = null;
                    }
                );
        };

    };
})();