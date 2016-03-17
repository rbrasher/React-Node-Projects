var React = require('react'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview;

var Content = {
    id: 'rss',
    types: [Categories.Content],
    name: 'RSS Feed',
    description: '',
    categories: ['Social Media', 'Content'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'RSSCatalogPreview',
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
//                <img src='images/page-rss.png' alt='RSS'/>
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'RSSLibraryPreview',

    render: function () {
        return (
            <div>
                RSS Library Preview
                {this.props.data}
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'RSSPropertyEditor',
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
        };
    },

    render: function () {
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Feed Url';
        return (
            <div>
                <Input type='text' placeholder='' label={label} ref='feedUrl'
                       labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                       valueLink={this.linkState('data.feelUrl')}/>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'RSSLivePreview',

    render: function () {
        return (
            <div>
                RSS Live Preview
            </div>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'RSSMockPreview',

    render: function () {
        return (
            <div>
                RSS Mock Preview
            </div>
        );
    }
});

module.exports = Content;