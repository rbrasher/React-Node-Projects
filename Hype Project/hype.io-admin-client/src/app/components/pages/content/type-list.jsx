var React = require('react'),
    _ = require('lodash'),
    UniqueIdMixin = require('unique-id-mixin'),
    //DragDrop = require('react-dnd'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input,
    Button = Bootstrap.Button,
    Panel = Bootstrap.Panel,
    Table = Bootstrap.Table,
    PageHeader = Bootstrap.PageHeader,
    DeepLinkedStateMixin = require('../../mixins/deep-link-state-mixin'),
    ContentTypes = require('./content-types'),
    Categories = ContentTypes.Categories
    Glyphicon = Bootstrap.Glyphicon;
    //Designer = require('./../pages/designer.jsx'),
    //PageTemplatePreview = Designer.PageTemplatePreview;

var Content = {
    id: 'list',
    types: [Categories.Content],
    name: 'List',
    description: '',
    categories: ['Profile'],
    tags: []
};

//Content.catalogPreview = React.createClass({
//    displayName: 'ListCatalogPreview',
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
//                List
//            </PageTemplatePreview>
//        );
//    }
//});

Content.libraryPreview = React.createClass({
    displayName: 'ListLibraryPreview',

    render: function () {
        return (
            <div>
                List Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'ListPropertyEditor',
    mixins: [
        UniqueIdMixin,
        DeepLinkedStateMixin
    ],

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

    addItem: function (value) {
        this.setState({
            items: this.state.data.items.push({
                key: this.getNextUid(value),
                value: value
            }),
            text: ''
        });
    },

    deleteItem: function (key) {
        console.log(this.state.data.items);
        console.log(key);
        this.setState({
            items: _.remove(this.state.data.items, function(item) {
                return item.key == key;
            })
        });
    },

    render: function () {
        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'List';
        var itemLabel = !!this.state.meta && !!this.state.meta.itemLabel ? this.state.meta.itemLabel : 'Text';
        var addClient = this.addItem.bind(this, this.state.text);
        return (
            <div>
                <Panel header={label} bsStyle="primary">
                    <Table>
                        <thead>
                            <th>{itemLabel}</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Input type='text' placeholder='' ref='item'
                                           wrapperClassName='col-xs-12'
                                           valueLink={this.linkState('text')} />
                                </td>
                                <td>
                                    <Button className="pull-right" onClick={addClient}>Add</Button>
                                </td>
                            </tr>
                        {
                            this.state.data.items.map(function(item) {
                                var deleteClick = this.deleteItem.bind(this, item.key);
                                return (
                                    <tr key={item.key}>
                                        <td>{item.value}</td>
                                        <td>
                                            <Button className="pull-right" onClick={deleteClick}>
                                                <Glyphicon glyph="remove" />
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            }, this)
                        }
                        </tbody>
                    </Table>
                </Panel>
            </div>
        );
    }
});

Content.livePreview = React.createClass({
    displayName: 'ListLivePreview',

    render: function () {
        return (
            <PageHeader>
                {this.props.data}
            </PageHeader>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'ListMockPreview',

    render: function () {
        return (
            <div>
                List Mock Preview
            </div>
        );
    }
});

module.exports = Content;