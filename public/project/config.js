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
            // register
            .when("/user/:uid", {
                templateUrl: "views/user/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            //    resolve: { loggedIn: checkLoggedIn }
            })
            // account
            .when("/user/:uid/account", {
                templateUrl: "views/user/account.view.client.html",
                controller: "AccountController",
                controllerAs: "model"
                //resolve: { loggedIn: checkLoggedIn }
            })
            .when("/user/:uid/messages", {
                templateUrl: "views/user/messages.view.client.html",
                controller: "UserMessagesController",
                controllerAs: "model"
                //resolve: { loggedIn: checkLoggedIn }
            })
            .when("/map", {
                templateUrl: "views/map/map.view.client.html",
                controller: "MapController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/landing/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/event/:eid", {
                templateUrl: "views/event/event-face.view.client.html",
                controller: "EventFaceController",
                controllerAs: "model",
                resolve: { }
                // implement logic to check if user is poster and runs this event loggedIn: checkLoggedIn 
            })
            .when("/event/:eid/edit", {
                templateUrl: "views/event/event-edit.view.client.html",
                controller: "EventEditController",
                controllerAs: "model"
            })
            .when("/organization/:oid", {
                templateUrl: "views/organization/organization-face.view.client.html",
                controller: "OrganizationFaceController",
                controllerAs: "model"
            })
            .when("/organization/:oid/edit", {
                templateUrl: "views/organization/organization-edit.view.client.html",
                controller: "OrganizationEditController",
                controllerAs: "model",
                resolve: { }
                // implement logic to check if user is poster and owns this organization loggedIn: checkLoggedIn
            });
    


        // how to tell if user is logged in
        function checkLoggedIn($q, $timeout, $http, $location, $rootScope, $route, UserService) {

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