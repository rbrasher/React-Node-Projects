var React = require('react/addons'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Panel = Bootstrap.Panel,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview,

var Content = {
    id: 'facebook-feed',
    types: [Categories.Content],
    name: 'Facebook Feed',
    description: '',
    categories: ['Social Media'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'FacebookFeedCatalogPreview',
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
//                <img src='images/page-facebook.png' alt='Facebook Feed'/>
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'FacebookFeedLibraryPreview',

    render: function () {
        return (
            <div>
                Facebook Feed Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'FacebookFeedPropertyEditor',
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
                <Panel header={label} bsStyle="primary">
                    <Input type='text' placeholder='Facebook page URL' label='Facebook Page URL' ref='feed'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('feed')}/>
                    <Input type='checkbox' label='Hide Cover Photo' ref='hideCover'
                           labelClassName=' col-xs-offset-3 col-xs-9'
                           checkedLink={this.linkState('hideCover')}/>
                    <Input type='checkbox' label='Show Posts' ref='showPosts'
                           labelClassName=' col-xs-offset-3 col-xs-9'
                           checkedLink={this.linkState('showPosts')}/>
                    <Input type='checkbox' label='Show Facepile' ref='showFacepile'
                           labelClassName=' col-xs-offset-3 col-xs-9'
                           checkedLink={this.linkState('showFacepile')}/>
                </Panel>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'FacebookFeedLivePreview',

    componentDidMount: function() {
        FB.XFBML.parse();
    },

    render: function () {
        var data = this.props.data;

        return (
            <div>
                Facebook Feed Test
                <div className="fb-page" data-href={data.feed} data-hide-cover={data.hideCover} data-show-facepile={data.showFacepile} data-show-posts={data.showPosts}></div>
            </div>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'FacebookFeedMockPreview',

    render: function () {
        return (
            <div>
                Facebook Feed Mock Preview
            </div>
        );
    }
});

module.exports = Content;