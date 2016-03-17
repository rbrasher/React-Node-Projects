var Categories = {
    PageTemplate: 'page-template',
    PageTemplateOrder: 'page-template-order'
};

var PageTemplateTypes = [];
var PageTemplateTypesIndex = {};

var PageTemplateManager = {
    Categories: Categories,

    addPageTemplate: function(pageTemplateType) {
        PageTemplateTypesIndex[pageTemplateType.id] = PageTemplateTypes.push(pageTemplateType) - 1;

        return this;
    },

    getPageTemplate: function(pageTemplateType) {
        return PageTemplateTypes[PageTemplateTypesIndex[pageTemplateType]];
    },

    getPageTemplates: function() {
        return PageTemplateTypes;
    }
};

module.exports = {
    Categories: Categories,
    Manager: PageTemplateManager
};