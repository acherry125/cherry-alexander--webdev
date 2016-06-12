module.exports = function(mongoose) {

    var PageSchema = require("./page.schema.server.js")(mongoose);
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        "createPage": createPage,
        "updatePage": updatePage,
        "deletePage": deletePage,
        "findPageById": findPageById,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "reorderWidgetsInPage": reorderWidgetsInPage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        page.dateCreated = new Date();
        return Page.create(page);
    }

    function updatePage(wid, newPage) {
        return Page.update(
            {_id: wid},
            {$set:
            {
                name: newPage.name,
                title: newPage.title,
                description: newPage.description
            }
            }

        )
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId})
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function findAllPagesForWebsite(wid) {
        return Page.find({"_website":wid});
    }

    function reorderWidgetsInPage(pageId, start, end) {
        Page
            .findOne({"_id": pageId})
            // found widget succesfully
            .then(
                function(response) {
                    if(response.data == null) {
                        return false;
                    }
                    var widgets = response.data.widgets;
                    // < reorder widgets here >
                    var newPage = response.data;
                    newPage.widgets = newWidgets;
                    updatePage(newPage._website, newPage)
                        .then(
                            // updated succesfully
                            function(response) {
                                return true;
                            },
                            // update error
                            function(error) {
                                return false;
                            }
                        )
                },
                // database error
                function(error) {
                    return false;
                }
            )
    }

};
