var React = require('react/addons'),
    DragDrop = require('react-dnd'),
    DesignerTypes = require('./../page-templates'),
    Categories = DesignerTypes.Categories,
    Designer = require('./../designer.jsx'),
    PageTemplatePreview = Designer.PageTemplatePreview,
    FormPage = require('../../../core/form-page.jsx');

var Template = {
    id: 'intro-page',
    types: [Categories.PageTemplate],
    name: 'Intro Page',
    icon: '\x70',
    description: '',
    categories: [''],
    tags: [],
    meta: {
        templateId: 'intro-page'
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
            type: 'video',
            meta: {
                label: 'Video'
            },
            data: {
                source: ''
            }
        },
        {
            type: 'image',
            meta: {
                label: 'Image'
            },
            data: {
                source: ''
            }
        },
        {
            type: 'markdown',
            meta: {
                label: 'Description'
            },
            data: {
                text: ''
            }
        }
    ]
};

Template.catalogPreview = React.createClass({
    displayName: 'SurveyQuestionPageCatalogPreview',
    mixins: [DragDrop.DragDropMixin],

    statics: {
        configureDragDrop: function (register) {
            var types = Template.types;

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