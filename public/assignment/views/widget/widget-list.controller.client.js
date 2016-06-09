
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .directive("sortableList", SortableList);

    // sorting directive function (see if this can be moved to a directive folder)
    function SortableList() {
        function linker(scope, element, attributes) {
            $(element)
                .sortable({
                    handle: ".ac-glyphicon-container"
                });
        }
        return {
            link: linker
        }
    }

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

        function SortableDirective() {
            function sortLinker(scope, element, atrributes) {
                var data = scope.data;
                $(element)
                    .find("#widget-container")
                    .sortable({
                        start: function() {
                            console.log("sorting began");
                        },
                        stop: function() {
                            console.log("sorting stopped")
                        }
                    });
            }
            return {
                scope: {},
                link: sortLinker
            }
        }
        /*
        // make the widget list sortable (only temporary until page refresh)
        $("#widget-container")
            .sortable({handle: ".ac-glyphicon-container"});
        */
    }

})();