(function() {
    angular
        .module("StockShare")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            // landing page
            .when("/landing", {
                templateUrl: "views/user/landing-page.view.client.html",
                // married to landing-page
                controller: "LoginController",
                controllerAs: "model"
            })
            // landing page
            .when("/", {
                templateUrl: "views/user/landing-page.view.client.html",
                // married to logincontroller
                controller: "LoginController",
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
            // profile
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
    };
})();