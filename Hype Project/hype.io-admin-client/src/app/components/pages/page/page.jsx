var React = require('react/addons'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    //DragDrop = require('react-dnd'),
    //Categories = PageTemplateTypes.Categories,
    //Designer = require('./designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    FormPage = require('../../core/form-page.jsx'),
    ContentTypes = require('./../content/content-types'),
    ContentManager = ContentTypes.Manager;

ContentManager
    .addContentType(require('../content/type-facebook-feed.jsx'))
    .addContentType(require('../content/type-video.jsx'))
    .addContentType(require('../content/type-rss.jsx'))
    .addContentType(require('../content/type-markdown.jsx'))
    .addContentType(require('../content/type-phone.jsx'))
    .addContentType(require('../content/type-image.jsx'))
    .addContentType(require('../content/type-list.jsx'))
    .addContentType(require('../content/type-list-page-action.jsx'))
    .addContentType(require('../content/type-lead-capture.jsx'))
    .addContentType(require('../content/type-location.jsx'));

var Page = {
};

//Template.catalogPreview = React.createClass({
//    mixins: [DragDrop.DragDropMixin],
//
//    statics: {
//        configureDragDrop: function (register) {
//            var types = Template.types;
//            types.push(Template.id);
//
//            types.forEach(function (item) {
//
//                register(item, {
//                    dragSource: {
//                        beginDrag: function (component) {
//                            return {
//                                item: {
//                                    pageType: Template.id
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
//            <PageTemplatePreview pageType={Template} {...this.dragSourceFor(Categories.PageTemplate)}>
//                <img src='images/page-video.png' alt='Video'/>
//            </PageTemplatePreview>
//        );
//    }
//});

Page.libraryPreview = React.createClass({
    render: function () {
        return (
            <div>
                {
                    this.props.data.content.map(function (item) {
                        var Preview = ContentManager.getContentType(item.type).libraryPreview;
                        return (
                            <Preview data={item.data}/>
                        );
                    })
                }
            </div>
        );
    }
});

Page.propertyEditor = React.createClass({
    displayName: 'ListPageActionPropertyEditor',
    mixins: [
        DeepLinkedStateMixin,
    ],

    getInitialState: function () {
        return {
            data: this.props.data
        };
    },

    getData: function () {
        return {
            id: this.state.data.id,
            title: this.state.data.title,
            meta: this.state.data.meta,
            content: this.props.data.content.map(function (item, index) {
                var editor = this.refs['editor-' + index];
                return editor.getData();
            }.bind(this))
        }
    },

    render: function () {
        return (
            <div>
                <FormPage>
                    <Input type='text' placeholder='' label='Title' ref='source'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('data.title')}/>
                {
                    this.props.data.content.map(function (item, index) {
                        var PropertyEditor = ContentManager.getContentType(item.type).propertyEditor;
                        return (
                            <PropertyEditor {...item} key={index} ref={'editor-' + index}/>
                        );
                    })
                }
                </FormPage>
            </div>
        );
    }
});

Page.livePreview = React.createClass({
    render: function () {
        return (
            <div>
                {
                    this.props.data.content.map(function (item, index) {
                        var Preview = ContentManager.getContentType(item.type).livePreview;
                        return (
                            <Preview data={item.data} key={index}/>
                        );
                    })
                }
            </div>
        );
    }
});

Page.mockPreview = React.createClass({
    render: function () {
        return (
            <div>
                {
                    this.props.data.content.map(function (item) {
                        var Preview = ContentManager.getContentType(item.type).mockPreview;
                        return (
                            <Preview data={item.data}/>
                        );
                    })
                }
            </div>
        );
    }
});

module.exports = Page;