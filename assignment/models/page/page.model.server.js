module.exports = function(mongoose) {

    var PageSchema = require("./page.schema.server.js")(mongoose);
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        "createPage": createPage,
        "updateUser": updatePage,
        "deleteUser": deletePage,
        "findPageById": findPageById,
        "findAllPagesForWebsite": findAllPagesForWebsite
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
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
        return Page.findOne({"_website":wid});
    }

};
