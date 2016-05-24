(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                // married to logincontroller
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
            	templateUrl: "views/user/register.view.client.html"
            })
            .when("/user/:uid", {
            	templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
            	templateUrl: "views/website/website-list.view.client.html"
            })
            .when("/user/:uid/website/new", {
            	templateUrl: "views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
            	templateUrl: "views/website/website-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page", {
            	templateUrl: "views/website/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new", {
            	templateUrl: "views/website/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
            	templateUrl: "views/website/page-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/website/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/website/widget-choose.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/website/widget-header.view.client.html"
            });
    };
})();