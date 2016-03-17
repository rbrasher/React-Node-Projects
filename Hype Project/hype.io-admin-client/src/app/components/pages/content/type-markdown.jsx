var React = require('react'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    PageHeader = Bootstrap.PageHeader,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview;

var Content = {
    id: 'markdown',
    types: [Categories.Content],
    name: 'Markdown',
    description: '',
    categories: ['Profile'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'MarkdownCatalogPreview',
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
//                Markdown
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'MarkdownLibraryPreview',

    render: function () {
        return (
            <div>
                Markdown Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'MarkdownPropertyEditor',
    mixins: [DeepLinkedStateMixin],

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
        }
    },

    render: function () {
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Text';
        return (
            <div>
                <Input type='text' placeholder='' label={label} ref='text'
                       labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                       valueLink={this.linkState('data.text')}/>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'MarkdownLivePreview',

    render: function () {
        return (
            <PageHeader>
                {this.props.data}
            </PageHeader>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'MarkdownMockPreview',

    render: function () {
        return (
            <div>
                Markdown Mock Preview
            </div>
        );
    }
});

module.exports = Content;