var React = require('react'),
    Router = require('react-router'),
    _ = require('lodash'),
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

var PageStore = require('../../stores/page-store.js');

var ProjectActions = require('../../actions/project-actions');

var Content = {
    id: 'list-page-action',
    types: [Categories.Content],
    name: 'List Page Action',
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
    displayName: 'ListPageActionLibraryPreview',

    render: function () {
        return (
            <div>
                List Page Action Library Preview
            </div>
        );
    }
});

Content.propertyEditor = React.createClass({
    displayName: 'ListPageActionPropertyEditor',
    mixins: [
        Router.Navigation,
        DeepLinkedStateMixin,
    ],

    getInitialState: function () {
        var projectId = this.context.router.getCurrentParams().projectId;
        return {
            meta: this.props.meta,
            data: {
                pageId: this.props.data.pageId,
                items: this.itemsFromPage(this.props.data.pageId, this.props.data.items)
            },
            projectId: projectId,
            originalItems: this.props.data.items
        };
    },

    getData: function () {
        return {
            type: Content.id,
            meta: this.state.meta,
            data: {
                pageId: this.state.data.pageId,
                items: this.state.data.items.map(function (item) {
                    var editor = this.refs['item-' + item.key];
                    return editor.getData();
                }, this)
            }
        }
    },

    componentDidMount: function () {
        ProjectActions.refreshPages(this.state.projectId);
    },

    itemsFromPage: function(pageId, originalItems) {
        var items = [];

        var page = PageStore.getPage(pageId);

        if (page && page.content) {

            var list = _.find(page.content, function (item) {
                return item.type == 'list';
            });


            list.data.items.map(function (item) {
                var originalItem = _.find(originalItems, function(oItem) {
                    return oItem.key == item.key;
                });

                items.push({
                    key: item.key,
                    name: item.value,
                    action: !!originalItem && !!originalItem.action ? originalItem.action : ''
                })
            });
        }

        return items;
    },

    onPageChange: function() {
        var pageId = this.refs.page.getValue();

        var items = this.itemsFromPage(pageId, this.state.originalItems);

        this.setState({
            data: {
                pageId: pageId,
                items: items
            }
        });
    },

    render: function () {
        var Item = React.createClass({
            displayName: 'ListPageActionItemPropertyEditor',
            mixins: [
                Router.Navigation,
                DeepLinkedStateMixin,
            ],

            getData: function () {
                return {
                    key: this.state.key,
                    action: this.state.action
                };
            },

            getInitialState: function () {
                return this.props.data;
            },

            render: function() {
                return (
                    <tr>
                        <td>{this.state.name}</td>
                        <td>
                            <Input type='text' placeholder='Url' valueLink={this.linkState('action')}/>
                        </td>
                    </tr>
                );
            }
        });

        var label = !!this.state.meta && !!this.state.meta.label ? this.state.meta.label : 'Action';
        var pageLabel = !!this.state.meta && !!this.state.meta.pageLabel ? this.state.meta.pageLabel : 'Page';

        var allPages = PageStore.getPages();
        var pages = _.filter(allPages, function(page) {
            var content = _.filter(page.content, function(content) {
                return content.type == 'list';
            });
            return content.length > 0;
        });

        return (
            <div>
                <Panel header={label} bsStyle="primary">
                    <Input type='select' placeholder='' label={pageLabel} ref='page'
                           labelClassName='col-xs-3' wrapperClassName='col-xs-7'
                           onChange={this.onPageChange} value={this.state.data.pageId}>
                        <option value='-1'>Select a question page...</option>
                        {
                            pages.map(function(item, index) {
                                return (
                                    <option value={item.id} key={index}>{item.title}</option>
                                );
                            })
                        }
                    </Input>
                    <Table>
                        <thead>
                            <th>Choice</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                        {
                            this.state.data.items.map(function(item) {
                                return (
                                    <Item data={item} key={item.key} ref={'item-' + item.key}/>
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
    displayName: 'ListPageActionLivePreview',

    render: function () {
        return (
            <PageHeader>
                {this.props.data}
            </PageHeader>
        );
    }
});

Content.mockPreview = React.createClass({
    displayName: 'ListPageActionMockPreview',

    render: function () {
        return (
            <div>
                List Page Action Mock Preview
            </div>
        );
    }
});

module.exports = Content;