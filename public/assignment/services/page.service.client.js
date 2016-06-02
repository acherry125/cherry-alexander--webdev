
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        /* Adds a new page to the database */
        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        /* Finds a page by its website id */
        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        /* Finds a page by its id */
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        /* Updates a page with new information */
        function updatePage(pageId, page) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages[i] = page;
                    return;
                }
            }
        }

        /* Deletes the given page */
        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

    }


})();