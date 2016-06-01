(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
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
                controller: "LoginController",
                controllerAs: "model"
            })
            // login
            .when("default", {
                templateUrl: "views/user/login.view.client.html",
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
            // websites
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            // website new
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            // website edit
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            // pages
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            // page new
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "PageNewController",
                controllerAs: "model"
            })
            // page edit
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "PageEditController",
                controllerAs: "model"
            })
            // widgets
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            // widget choose
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-choose.view.client.html",
                controller: "WidgetChooseController",
                controllerAs: "model"
            })
            // widget edit
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            // widget edit
            .when("/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
    };
})();