
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
            page["websiteId"] = websiteId;
            pages.push(page);
        }

        /* Finds a page by its website id */
        function findPagesByWebsiteId(websiteId) {
            var result = [];
            for(var i in pages) {
                if(pages[i].websiteId == websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

        /* Finds a page by its id */
        function findPageById(pageId) {
            var result = [];
            for(var i in pages) {
                if (pages[i]._id == pageId) {
                    return pages[i];
                }
            }
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
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return;
                }
            }
        }

    }


})();