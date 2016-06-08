
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        vm.fixYoutube = fixYoutube;
        var allowSrc = allowSrc;

        function init() {
            WidgetService
                .findWidgetsByPageId(pid)
                .then(function(response) {
                    vm.widgets = response.data;
                    var reloadCheck = false;
                    for(var i in vm.widgets) {
                        if(!(vm.widgets[i].name)) {
                            WidgetService.deleteWidget(vm.widgets[i]._id);
                            reloadCheck = true;
                        }
                    }
                    if(reloadCheck) {
                        init();
                    }
                });
        }

        init();

        /* Turns any youtube link into a trusted embeddable link */
        function fixYoutube(link) {
            /* regexp courtesy of
             http://stackoverflow.com/questions/3452546/
             javascript-regex-how-to-get-youtube-video-id-from-url" */
            var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            var id = link.match(regExp);
            var url = "https://www.youtube.com/embed/" + id[1];
            return allowSrc(url);
        }

        function allowSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function getTrustedHTML() {

        }

        // make the widget list sortable (only temporary until page refresh)
        $("#widget-container")
            .sortable({handle: ".ac-glyphicon-container"});

    }

})();