var React = require('react'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Panel = Bootstrap.Panel,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview;

var Content = {
    id: 'location',
    types: [Categories.Content],
    name: 'Location',
    description: '',
    categories: ['Profile'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'LocationCatalogPreview',
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
//                <img src='images/page-location.png' alt='Location'/>
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'LocationLibraryPreview',

    render: function () {
        return (
            <div>
                Location Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'LocationPropertyEditor',
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
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Location';
        return (
            <div>
                <Panel header={label} bsStyle="primary">
                    <Input type='text' placeholder='' label='Street Address' ref='streetAddress'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('data.streetAddress')}/>
                    <Input type='text' placeholder='' label='Street Address 2' ref='streetAddress2'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('data.streetAddress2')}/>
                    <Input type='text' placeholder='' label='City' ref='city'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('data.city')}/>
                    <Input type='text' placeholder='' label='State' ref='state'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('data.state')}/>
                    <Input type='text' placeholder='' label='Zip Code' ref='zipCode'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-9'
                           valueLink={this.linkState('data.zipCode')}/>
                </Panel>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'LocationLivePreview',

    render: function () {
        //TODO: fix this
        if(this.props.data.streetAddress2) {
            return (
                <div>
                    <Panel header="Our Location:" bsStyle="primary">
                        {this.props.data.streetAddress}<br />
                        {this.props.data.streetAddress2}<br />
                        {this.props.data.city}, {this.props.data.state}&nbsp;&nbsp;{this.props.data.zipCode}

                    </Panel>
                </div>
            );
        } else {
            return (
                <div>
                    <Panel header="Our Location:" bsStyle="primary">
                        {this.props.data.streetAddress}<br />
                        {this.props.data.city}, {this.props.data.state}&nbsp;&nbsp;{this.props.data.zipCode}
                    </Panel>
                </div>
            );
        }
    }
});

Content.mockPreview = React.createClass({
    displayName: 'LocationMockPreview',

    render: function () {
        return (
            <div>
                Location Mock Preview
            </div>
        );
    }
});

module.exports = Content;