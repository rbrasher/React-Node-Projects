var React = require('react'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Panel = Bootstrap.Panel,
    Glyphicon = Bootstrap.Glyphicon,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview;

var Content = {
    id: 'phone',
    types: [Categories.Content],
    name: 'Phone',
    description: '',
    categories: ['Profile'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'PhoneCatalogPreview',
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
//                Phone
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'PhoneLibraryPreview',

    render: function () {
        return (
            <div>
                Phone Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'PhonePropertyEditor',
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
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Phone Number';
        return (
            <div>
                <Input type='text' placeholder='' label={label} ref='phone'
                       labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                       valueLink={this.linkState('data.phone')}/>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'PhoneLivePreview',

    render: function () {
        return (
            <Panel header="Contact Us:" bsStyle="primary">
                <Glyphicon glyph="phone" /> {this.props.data}
            </Panel>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'PhoneMockPreview',

    render: function () {
        return (
            <div>
                Phone Mock Preview
            </div>
        );
    }
});

module.exports = Content;