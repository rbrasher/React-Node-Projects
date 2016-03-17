var React = require('react')
    , PropTypes = React.PropTypes
    , update = require('react/lib/update')
    , Reflux = require('reflux')

    , Bootstrap = require('react-bootstrap')
    , Row = Bootstrap.Row
    , Col = Bootstrap.Col
    , Modal = Bootstrap.Modal
    , Button = Bootstrap.Button
    , Input = Bootstrap.Input
    , Alert = Bootstrap.Alert
    , Designer = require('../page/designer.jsx')

    , DragDrop = require('react-dnd')
    , DragDropMixin = DragDrop.DragDropMixin

    , ContentPage = require('../content-page.jsx')
    , PageDropZone = Designer.PageDropZone
    , PageTemplateTypes = require('../page/page-templates')
    , Page = require('../page/page.jsx')
    , Categories = PageTemplateTypes.Categories
    , PageTemplateManager = PageTemplateTypes.Manager
    ;

var PageStore = require('../../stores/page-store.js')
    ;

var DesignerActions = require('../../actions/designer-actions')
    , ProjectActions = require('../../actions/project-actions')
    ;

PageTemplateManager
    .addPageTemplate(require('../page/templates/template-about.jsx'))
    .addPageTemplate(require('../page/templates/template-intro.jsx'))
    .addPageTemplate(require('../page/templates/template-survey-question.jsx'))
    .addPageTemplate(require('../page/templates/template-survey-results.jsx'))
    .addPageTemplate(require('../page/templates/template-lead-capture.jsx'))
;

function getPages(projectId) {
    return PageStore.getPages(projectId);
}

var ProjectPages = React.createClass({
    displayName: 'ProjectPages',
    mixins: [
        Reflux.ListenerMixin
    ],

    _onPagesChanged: function (pages) {
        //console.log("_onPagesChanged: " + builds);
        this.setState({
            isBusy: false,
            error: null,
            pages: pages
        });
    },

    _handleEditorCancel: function () {
        this.setState({editor: false});
    },

    _handleEditorSubmit: function () {
        var page = this.refs.editor.getData();

        this.setState({isBusy: true, error: null});
        if ('edit' === this.state.editorMode) {
            ProjectActions.editPage(page);
        } else {
            ProjectActions.addPage(page);
        }
    },

    _hasError: function () {
        return !!(this.state.error);
    },

    _handleErrorDismiss: function () {
        this.setState({error: null});
    },

    //// ProjectActions.refreshPages
    //_onRefreshPagesCompleted: function () {
    //    this.setState({error: null});
    //},
    //_onRefreshPagesFailed: function (arguments) {
    //    this.setState({error: arguments});
    //},
    //_onRefreshPagesAlways: function () {
    //    this.setState({pages: getPages(this.state.projectId), isBusy: false});
    //},

    // ProjectActions.reorderPages
    _onReorderPagesCompleted: function () {
        this.setState({error: null});
    },
    _onReorderPagesFailed: function (arguments) {
        this.setState({error: arguments});
    },
    _onReorderPagesAlways: function () {
        this.setState({pages: getPages(this.state.projectId), isBusy: false});
    },

    // ProjectActions.addPage
    _onAddPage: function (data) {
        var template = PageTemplateManager.getPageTemplate(data.payload.pageType);
        this.setState(
            {
                data: template,
                editor: Page.propertyEditor,
                editorMode: 'new'
            }
        );
    },
    _onAddPageCompleted: function () {
        this.setState({error: null});
    },
    _onAddPageFailed: function (error) {
        this.setState({error: error});
    },
    _onAddPageAlways: function () {
        this.setState({isBusy: false, editor: false, editorMode: null});
    },

    // ProjectActions.editPage
    _onEditPage: function (page) {
        this.setState(
            {
                data: page,
                editor: Page.propertyEditor,
                editorMode: 'edit'
            }
        );
    },
    _onEditPageCompleted: function () {
        this.setState({error: null});
    },
    _onEditPageFailed: function (error) {
        this.setState({error: error});
    },
    _onEditPageAlways: function () {
        this.setState({isBusy: false, editor: false, editorMode: null});
    },

    // ProjectActions.deletePage
    _onDeletePage: function (page) {
        ProjectActions.deletePage(page.id);
    },
    _onDeletePageCompleted: function () {
        this.setState({error: null});
    },
    _onDeletePageFailed: function (error) {
        this.setState({error: error});
    },
    _onDeletePageAlways: function () {
        this.setState({isBusy: false, editor: false});
    },

    // Reorder Pages
    _movePage: function (pageId, afterPageId) {
        var { pages } = this.state;
        var page = pages.filter(function (p) {
            return p.id === pageId;
        })[0];
        var afterPage = pages.filter(function (p) {
            return p.id === afterPageId
        })[0];
        var pageIndex = pages.indexOf(page);
        var afterPageIndex = pages.indexOf(afterPage);

        // For info on `update()` - https://facebook.github.io/react/docs/update.html
        this.setState(update(this.state, {
            pages: {
                $splice: [
                    [pageIndex, 1],
                    [afterPageIndex, 0, page]
                ]
            }
        }));
    },

    _onDragComplete: function () {
        this.setState({isBusy: true, error: null});
        ProjectActions.reorderPages(this.state.projectId, this.state.pages);
    },

    getInitialState: function () {
        return {
            isBusy: !PageStore.isLoaded(),
            pages: PageStore.getPages(),
            editor: false,
            error: null
        }
    },

    componentDidMount: function () {
        this.listenTo(PageStore, this._onPagesChanged);

        this.listenTo(DesignerActions.addPage, this._onAddPage);
        this.listenTo(ProjectActions.addPage.completed, this._onAddPageCompleted);
        this.listenTo(ProjectActions.addPage.failed, this._onAddPageFailed);
        this.listenTo(ProjectActions.addPage.always, this._onAddPageAlways);

        this.listenTo(DesignerActions.editPage, this._onEditPage);
        this.listenTo(ProjectActions.editPage.completed, this._onEditPageCompleted);
        this.listenTo(ProjectActions.editPage.failed, this._onEditPageFailed);
        this.listenTo(ProjectActions.editPage.always, this._onEditPageAlways);

        this.listenTo(DesignerActions.deletePage, this._onDeletePage);
        this.listenTo(ProjectActions.deletePage.completed, this._onDeletePageCompleted);
        this.listenTo(ProjectActions.deletePage.failed, this._onDeletePageFailed);
        this.listenTo(ProjectActions.deletePage.always, this._onDeletePageAlways);

        //this.listenTo(ProjectActions.refreshPages.completed, this._onRefreshPagesCompleted);
        //this.listenTo(ProjectActions.refreshPages.failed, this._onRefreshPagesFailed);
        //this.listenTo(ProjectActions.refreshPages.always, this._onRefreshPagesAlways);

        this.listenTo(ProjectActions.reorderPages.completed, this._onReorderPagesCompleted);
        this.listenTo(ProjectActions.reorderPages.failed, this._onReorderPagesFailed);
        this.listenTo(ProjectActions.reorderPages.always, this._onReorderPagesAlways);
    },

    renderOverlay: function () {
        if (!this.state.editor) {
            return;
        }
        var caption;
        if ('edit' === this.state.editorMode) {
            caption = 'Edit Page';
        } else {
            caption = 'Add Page';
        }

        var Editor = this.state.editor;

        return (
            <Modal bsStyle='primary' title={caption} onRequestHide={this._handleEditorCancel}>
                <div className='modal-body'>
                    <div className='form-horizontal'>
                        <Editor data={this.state.data} ref='editor'/>
                    </div>
                </div>
                <div className='modal-footer'>
                    <Button bsStyle='primary' onClick={this._handleEditorSubmit}>Submit</Button>
                </div>
            </Modal>
        );
    },

    renderBusy: function () {
        if (!this.state.isBusy) {
            return <span />;
        }

        var ignoreOnRequestHide = function () {
        };
        return (
            <div className="busy">
                <div className="busy-container">
                    <i className="fa fa-spinner fa-3x fa-spin"></i>
                </div>
            </div>
        )
    },

    renderErrorPanel: function () {
        var errorShow = {
            display: this._hasError() ? 'block' : 'none'
        };

        return (
            <div style={errorShow}>
                <Alert bsStyle='danger' onDismiss={this._handleErrorDismiss}>
                    <h4>Has Errors:</h4>

                    <p>{JSON.stringify(this.state.error)}</p>
                </Alert>
            </div>
        );
    },

    render: function () {
        return (
            <ContentPage title='Project Pages' subTitle='Below is a list of your current project pages'
                         icon='gi gi-book'>
                <div>
                    {this.renderErrorPanel()}

                    <Row>
                        {
                            this.state.pages.map(function (page, idx) {
                                var LivePreview = Page.livePreview;

                                return (
                                    <PageControls data={page}
                                                  movePage={this._movePage}
                                                  onDragComplete={this._onDragComplete}
                                                  key={page.id}
                                                  id={page.id}>
                                        <LivePreview data={page}/>
                                    </PageControls>
                                );
                            }.bind(this))
                        }
                        <Col md={2} xs={12}>
                            <PageDropZone>
                                <i>Drag page here</i>
                            </PageDropZone>
                        </Col>
                    </Row>
                    <ul className='list-inline'>
                        {
                            PageTemplateManager.getPageTemplates().map(function (item) {
                                var Preview = item.catalogPreview;

                                return (
                                    <li key={item.id}>
                                        <Preview />
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {this.renderOverlay()}
                    {this.renderBusy()}
                </div>
            </ContentPage>
        );
    }
});

var PageControls = React.createClass({
    displayName: "PageControls",
    mixins: [DragDropMixin],
    propTypes: {
        data: PropTypes.any.isRequired,
        movePage: PropTypes.func.isRequired,
        onDragComplete: PropTypes.func
    },

    statics: {
        configureDragDrop(register) {
            register(Categories.PageTemplateOrder, {
                dragSource: {
                    beginDrag: function (component) {
                        return {
                            item: {
                                id: component.props.data.id
                            }
                        };
                    },
                    endDrag: function (component, effect) {
                        console.log('PageControls::EndDrag', effect);
                        component.onDragComplete()
                    }
                },
                dropTarget: {
                    over: function (component, item) {
                        component.props.movePage(item.id, component.props.data.id);
                    }
                }
            });
        }
    },

    getInitialState: function () {
        return {
            confirming: false
        };
    },

    handleConfirmDelete: function () {
        if (this.state.confirming) {
            this.setState({
                confirming: false
            });

            DesignerActions.deletePage(this.props.data);

        } else {
            return this.setState({
                confirming: true
            });
        }
    },

    handleAbortDelete: function () {
        return this.setState({
            confirming: false
        });
    },

    editPage: function () {
        DesignerActions.editPage(this.props.data);
    },

    render: function () {
        var buttons;
        if (this.state.confirming) {
            buttons =
                <div>
                    <div className="mk-delete-confirm">Delete&#63;</div>
                    <a href="javascript:void(0);" onClick={this.handleConfirmDelete}>
                        <div className="handleAction" data-icon="&#x4e;"></div>
                    </a>
                    <a href="javascript:void(0);" onClick={this.handleAbortDelete}>
                        <div className="handleAction" data-icon="&#x4d;"></div>
                    </a>
                </div>
        } else {
            buttons = (
                <div className="mk-edit-controls">
                    <a id="edit" href="javascript:void(0);" onClick={this.editPage}>
                        <div data-icon="&#x6b;"></div>
                    </a>
                    <a href="javascript:void(0);" onClick={this.handleConfirmDelete}>
                        <div data-icon="&#xe019;"></div>
                    </a>
                </div>
            )
        }

        const { isDragging } = this.getDragState(Categories.PageTemplateOrder);
        const style = {opacity: isDragging ? 0 : 1};
        const buttonStyle = isDragging ? {display: 'none'} : {display: 'block'};
        // console.log('Rendering Page Controls', this.props.id, isDragging, buttonStyle);
        return (
            <Col lg={2} md={3} xs={12} style={style}>
                <div className="previewContainer">
                    {this.props.children}

                    <div className="controls-container"
                        {...this.dragSourceFor(Categories.PageTemplateOrder)}
                        {...this.dropTargetFor(Categories.PageTemplateOrder)}>
                        <div className="mk-block-controls" style={buttonStyle}>
                            <div className="mk-edit-controls">
                                {buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        );
    },

    onDragComplete: function () {
        if (this.props.onDragComplete) {
            this.props.onDragComplete();
        }
    }
});

module.exports = ProjectPages;
