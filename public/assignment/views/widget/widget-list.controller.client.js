
(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($scope, $routeParams, $sce, $location, WidgetService) {
        vm = this;
        var uid = $routeParams.uid;
        vm.userId =  uid;
        var wid = $routeParams.wid;
        vm.websiteId =  wid;
        var pid = $routeParams.pid;
        vm.pageId =  pid;
        vm.fixYoutube = fixYoutube;
        var allowSrc = allowSrc;
        vm.getTrustedHTML = getTrustedHTML;
        vm.editWidget = editWidget;
        vm.reorder = reorder;

        vm.style = "{background: red}";


        vm.miniToolbar = [['bold','italics','underline','strikeThrough'],
            ['ul','ol'],['justifyLeft','justifyCenter','justifyRight','justifyFull'],
            ['indent','outdent']];


        function init() {
            WidgetService
                .findWidgetsByPageId(String(pid))
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

        function getTrustedHTML(html) {
            return $sce.trustAsHtml(html);
        }
        
        function editWidget(wgid) {
            $location.url("/user/" + uid + "/website/" + wid + "/page/"+ pid + "/widget/" + wgid)
        }

       function reorder(startIndex, endIndex) {
           WidgetService
               .reorderWidgets(pid, startIndex, endIndex)
               .then(
                   function(response) {
    
                    },
                    function(error) {
                        /*
                        reload the page so the user doens't think
                        dragging worked
                        */
                        init();
                    }
                )
       }
    }

})();