
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;

        /* Adds a new user to the database */
        function createWebsite(userId, website) {
            website["developerId"] = userId;
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for(var i in websites) {
                if(websites[i].developerId == userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            var result = [];
            for(var i in websites) {
                if (websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
        }

        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return;
                }
            }
        }
    }

})();
