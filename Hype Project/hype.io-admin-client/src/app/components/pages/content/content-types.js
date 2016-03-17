var Categories = {
    Content: 'content'
};

var ContentTypes = [];
var ContentTypesIndex = {};

var ContentTypeManager = {
    Categories: Categories,

    addContentType: function(contentType) {
        ContentTypesIndex[contentType.id] = ContentTypes.push(contentType) - 1;

        return this;
    },

    getContentType: function(contentType) {
        return ContentTypes[ContentTypesIndex[contentType]];
    },

    getContentTypes: function() {
        return ContentTypes;
    }
};

module.exports = {
    Categories: Categories,
    Manager: ContentTypeManager
};