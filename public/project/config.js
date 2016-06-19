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
            // account
            .when("/user/:uid", {
                templateUrl: "views/user/account.view.client.html",
                controller: "AccountController",
                controllerAs: "model"
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
                controllerAs: "model"
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
                controllerAs: "model"
            })


    };
})();