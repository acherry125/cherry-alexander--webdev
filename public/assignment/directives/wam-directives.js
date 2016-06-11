(function() {
    angular
        .module("WebAppMaker")
        .directive("wamSortable", WamSortable);

    // sorting directive function
    function WamSortable() {
        function linker(scope, element, attributes) {
            $(element)
                .sortable({
                    placeholder: "ui-state-highlight",
                    handle: ".glyphicon-align-justify",
                    start: function(event, ui) {
                        console.log("sorting began");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log(endIndex);
                        if(endIndex != startIndex) {
                            scope.reorder(startIndex, endIndex);
                        }
                    }

                });
        }
        return {
            scope : {
                reorder : "="
            },
            link: linker
        }
    }




})();