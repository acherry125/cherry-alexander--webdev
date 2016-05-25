
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService() {

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(userId, website) {
            website["developerId"] = userId;
            websites.push(website);
        }

        function findPageByWebsiteId(userId) {
            var result = [];
            for(var i in websites) {
                if(websites[i].developerId == userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findPageById(websiteId) {
            var result = [];
            for(var i in websites) {
                if (websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
        }

        function updatePage(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return;
                }
            }
        }

        function deletePage(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return;
                }
            }
        }

    }


})();