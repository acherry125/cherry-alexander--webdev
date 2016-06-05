(function() {
    angular
        .module("StockShare")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            // login
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                // married to logincontroller
                controller: "LoginController",
                controllerAs: "model"
            })
            // login
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                // married to logincontroller
                controller: "LoginController",
                controllerAs: "model"
            })
            // login
            .when("/default", {
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