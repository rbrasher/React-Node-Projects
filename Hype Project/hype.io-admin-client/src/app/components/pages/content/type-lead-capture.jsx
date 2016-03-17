var React = require('react'),
    //DragDrop = require('react-dnd'),
    //Bootstrap = require('react-bootstrap'),
    //Input = Bootstrap.Input,
    //DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview;

var Content = {
    id: 'lead-capture',
    types: [Categories.Content],
    name: 'Lead Capture',
    description: '',
    categories: ['Content'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'LeadCaptureCatalogPreview',
//    mixins: [DragDrop.DragDropMixin],
//
//    statics: {
//        configureDragDrop: function (register) {
//            var types = Content.types;
//            types.push(Content.id);
//
//            types.forEach(function (item) {
//
//                register(item, {
//                    dragSource: {
//                        beginDrag: function (component) {
//                            return {
//                                item: {
//                                    contentType: Content.id
//                                }
//                            }
//                        }
//                    }
//                });
//            });
//        }
//    },
//
//    render: function () {
//        return (
//            <PageTemplatePreview contentType={Content} {...this.dragSourceFor(Categories.Content)}>
//                <img src='images/content-lead-capture.png' alt='Lead Capture'/>
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'LeadCaptureLibraryPreview',

    render: function () {
        return (
            <div>
                Lead Capture Library Preview
                {this.props.data}
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'LeadCapturePropertyEditor',
    //mixins: [DeepLinkedStateMixin],

    getInitialState: function () {
        return {
            meta: this.props.meta,
            data: this.props.data
        };
    },

    getData: function () {
        return {
            type: Content.id,
            meta: this.state.meta,
            data: this.state.data
        };
    },

    render: function () {
        return (
            <div>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'LeadCaptureLivePreview',

    render: function () {
        return (
            <div>
                Lead Capture Live Preview
            </div>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'LeadCaptureMockPreview',

    render: function () {
        return (
            <div>
                Lead Capture Mock Preview
            </div>
        );
    }
});

module.exports = Content;