var React = require('react/addons'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview,

var Content = {
    id: 'video',
    types: [Categories.Content],
    name: 'Video',
    description: '',
    categories: ['Social Media', 'Content'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'VideoCatalogPreview',
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
//                <img src='images/page-video.png' alt='Video'/>
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'VideoLibraryPreview',

    render: function () {
        return (
            <div>
                Video Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'VideoPropertyEditor',
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
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Video';
        return (
            <div>
                <Input type='text' placeholder='Embed URL' label={label} ref='embed'
                       labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                       valueLink={this.linkState('data.source')}/>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'VideoLivePreview',

    render: function () {
        var data = this.props.data;
        return (
            <div>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={data.source} allowFullScreen></iframe>
                </div>
            </div>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'VideoMockPreview',

    render: function () {
        return (
            <div>
                Video Mock Preview
            </div>
        );
    }
});

module.exports = Content;