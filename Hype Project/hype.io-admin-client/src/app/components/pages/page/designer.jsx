var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Well = Bootstrap.Well;

var DesignerTypes = require('./page-templates'),
    Categories = DesignerTypes.Categories,
    Manager = DesignerTypes.Manager,
    DragDrop = require('react-dnd');

var DesignerActions = require('../../actions/designer-actions');

var PageDropZone = React.createClass({
    displayName: 'PagePreview',
    mixins: [DragDrop.DragDropMixin],
    getInitialState: function() {
        return {
            child: false
        }
    },

    statics: {
        configureDragDrop: function (register) {
            register(Categories.PageTemplate, {
                dropTarget: {
                    acceptDrop: function(component, payload) {
                        //component.setState({child: Manager.getPageTemplate(payload.pageType)});
                        //component.child = Manager.getPageTemplate(payload.pageType);

                        DesignerActions.addPage({
                            payload: payload
                        });
                    }
                }

                //dragSource: {
                //    beginDrag: function (component) {
                //        console.log('PageDropZone.beginDrag()');
                //
                //        return {
                //            item: {
                //                image: component.props.image
                //            }
                //        };
                //    }
                //}
            });
        }
    },

    render: function () {
        var dropState = this.getDropState(Categories.PageTemplate);

        //var dropText = dropState.isDragging ? (<div>Drop here</div>) : null;

        var style = {};

        if (dropState.isDragging) {
            style.border = 'dashed';
        };

        var Component = this.state.child ? this.state.child.libraryPreview : false;

        return (
            <Well {...this.dropTargetFor(Categories.PageTemplate)} style={style}>
                {this.props.children}
                {Component ? (<Component />) : null}
            </Well>
        );
    }
});

var PageTemplatePreview = React.createClass({
    displayName: 'PageTemplatePreview',
    propTypes: {
        pageType: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <div style={{border: 'solid', padding: '10px'}} {...this.props}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = {
    PageDropZone: PageDropZone,
    PageTemplatePreview: PageTemplatePreview
};