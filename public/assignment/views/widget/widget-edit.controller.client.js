
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        var wgid = $routeParams.wgid;
        vm.widgetId =  wgid;
        vm.goBack = goBack;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.checkNew = checkNew;
        var validityCheck = validityCheck;

        function init() {
            WidgetService
                .findWidgetById(wgid)
                .then(
                    function(response) {
                        vm.widget = response.data;
                    },
                    function(error) {
                        $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
                    }
                );
            
        }

        init();

        function goBack() {
            $location.url("/user/" + uid + "/website/"  + wid + "/page/" + pid + "/widget/");
        }

        // checks if the widget being edited is a new widget or an existing widget
        function checkNew(){
            WidgetService
                .findWidgetById(wgid)
                .then(
                    function(reponse) {
                        var widgetData = reponse.data;
                        // check if widget has been saved yet
                        if(!(widgetData.name)) {
                            deleteWidget();
                        }
                        // widget has been saved, keep it.
                        goBack();
                    },
                    function(error) {
                        /* ignore the error, its either ok or there is now
                        an empty widget */
                        goBack();
                    }
                );
        }

        // validates that correct fields are populated
        function validityCheck() {
            if (!(vm.widget.name)) {
                vm.error = "Widget " + vm.widgetType + " must have name";
            } else if (vm.widget.widgetType == "HEADER" && !(vm.widget.text && vm.widget.size)) {
                vm.error = "Header Widget must have text and size";
            } else if (vm.widget.widgetType == "IMAGE" && !(vm.widget.url && vm.widget.width)) {
                vm.error = "Image Widget must have url, and width";
            } else if (vm.widget.widgetType == "YOUTUBE" && !(vm.widget.url && vm.widget.width)) {
                vm.error = "YouTube Widget must have url, and width"
            } else {
                vm.error = "";
                return true;
            }
        }

        // update the widget
        function updateWidget() {
            if (validityCheck()) {
                WidgetService
                    .updateWidget(wgid, vm.widget)
                    .then(
                        function(response) {
                            goBack();
                        },
                        function(error) {
                            vm.error = error.body;
                        }
                    );
            }
        }

        // delete the widget
        function deleteWidget() {
            WidgetService
                .deleteWidget(wgid)
                .then(
                    function(response) {
                        goBack();
                    },
                    function(error) {
                        vm.error = error.body;
                    });
        }

    }

})();
