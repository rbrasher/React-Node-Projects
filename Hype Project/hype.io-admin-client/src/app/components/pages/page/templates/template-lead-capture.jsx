var React = require('react/addons'),
    DragDrop = require('react-dnd'),
    DesignerTypes = require('./../page-templates'),
    Categories = DesignerTypes.Categories,
    Designer = require('./../designer.jsx'),
    PageTemplatePreview = Designer.PageTemplatePreview,
    FormPage = require('../../../core/form-page.jsx');

var Template = {
    id: 'lead-capture-page',
    types: [Categories.PageTemplate],
    name: 'Lead Capture',
    icon: '\ue010',
    description: '',
    categories: [''],
    tags: [],
    meta: {
        templateId: 'lead-capture-page'
    },
    content: [
        {
            type: 'markdown',
            meta: {
                label: 'Headline'
            },
            data: {
                text: ''
            }
        },
        {
            type: 'markdown',
            meta: {
                label: 'Body'
            },
            data: {
                text: ''
            }
        },
        {
            type: 'lead-capture'
        }
    ]
};

Template.catalogPreview = React.createClass({
    displayName: 'LeadCapturePageCatalogPreview',
    mixins: [DragDrop.DragDropMixin],

    statics: {
        configureDragDrop: function (register) {
            var types = Template.types;
            //types.push(Template.id);
            //console.log(types);

            types.forEach(function (item) {

                register(item, {
                    dragSource: {
                        beginDrag: function () {
                            return {
                                item: {
                                    pageType: Template.id
                                }
                            }
                        }
                    }
                });
            });
        }
    },

    render: function () {
        return (
            <PageTemplatePreview pageType={Template} {...this.dragSourceFor(Categories.PageTemplate)}>
                <div className="mk-icon" data-icon={Template.icon} style={{'fontSize': '48px', 'textAlign': 'center'}}></div>
                {Template.name}
            </PageTemplatePreview>
        );
    }
});

module.exports = Template;