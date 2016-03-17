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
    id: 'image',
    types: [Categories.Content],
    name: 'Image',
    description: '',
    categories: ['Profile'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'ImageCatalogPreview',
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
//                Image
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'ImageLibraryPreview',

    render: function () {
        return (
            <div>
                Image Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'ImagePropertyEditor',
    mixins: [DeepLinkedStateMixin],

    getInitialState: function () {
        return {
            meta: this.props.meta,
            data: this.props.data
        }
    },

    getData: function () {
        return {
            type: Content.id,
            meta: this.state.meta,
            data: this.state.data
        }
    },

    render: function () {
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Source';
        return (
            <div>
                <Input type='text' placeholder='' label={label} ref='source'
                       labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                       valueLink={this.linkState('data.source')}/>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'ImageLivePreview',

    render: function () {

        return (
            <div className="media">
                <div className="media-middle">
                    <img className="media-object" src={this.props.data.source} alt={this.props.data.alternateText} title={this.props.data.caption} style={{'width': '100%'}} />
                </div>
            </div>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'ImageMockPreview',

    render: function () {
        return (
            <div>
                Image Mock Preview
            </div>
        );
    }
});

module.exports = Content;