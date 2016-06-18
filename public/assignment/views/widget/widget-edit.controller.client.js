
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
        vm.flickr = flickr;
        var validityCheck = validityCheck;

        // initialize the page edit
        function init() {
            WidgetService
                .findWidgetById(wgid)
                .then(
                    function(response) {
                        vm.widget = response.data;
                        // create default width
                        if (vm.widget.type == "HEADING") {
                            vm.widget.size = String(vm.widget.size);
                        }
                    },
                    function(error) {
                        $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
                    }
                );
            
        }

        init();

        // go back to the widget list
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
                        /* ignore the error, let the widget-list controller handle it */
                        goBack();
                    }
                );
        }

        // validates that correct fields are populated
        function validityCheck() {
            if (!(vm.widget.name)) {
                var type = vm.widget.type;
                var first = type[0];
                var rest = type.substring(1).toLowerCase();
                vm.error = first + rest + " widget must have name";
            } else if (vm.widget.type == "HEADING" && !(vm.widget.text && vm.widget.size)) {
                vm.error = "Header Widget must have text and size";
            } else if (vm.widget.type == "IMAGE" && !(vm.widget.url && vm.widget.width)) {
                vm.error = "Image Widget must have url, and width";
            } else if (vm.widget.type == "YOUTUBE" && !(vm.widget.url && vm.widget.width)) {
                vm.error = "YouTube Widget must have url, and width"
            } else if(vm.widget.type == "HTML" && !(vm.widget.text)) {
                vm.error = "HTML Widget must text"
            }
            else {
                vm.error = "";
                return true;
            }
        }
        
        // validates that correct fields are populated
        function flickr() {
            $location.url("/user/" + uid
                + "/website/" + wid
                + "/page/" + pid
                + "/widget/" + wgid
                + "/flickr");
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
                            vm.error = error.data;
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
