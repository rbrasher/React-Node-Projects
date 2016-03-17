var React = require('react/addons'),
    DragDrop = require('react-dnd'),
    DesignerTypes = require('./../page-templates'),
    Categories = DesignerTypes.Categories,
    Designer = require('./../designer.jsx'),
    PageTemplatePreview = Designer.PageTemplatePreview,
    FormPage = require('../../../core/form-page.jsx');

var Template = {
    id: 'about-page',
    types: [Categories.PageTemplate],
    name: 'About Page',
    icon: '\x69',
    description: '',
    categories: [''],
    tags: [],
    meta: {
    },
    content: [
        {
            type: 'markdown',
            meta: {
                label: 'Company Name'
            },
            data: {
                text: ''
            }
        },
        {
            type: 'image',
            meta: {
                label: 'Logo'
            },
            data: {
                source: ''
            }
        },
        {
            type: 'location',
            meta: {
                label: 'Address'
            },
            data: {
                streetAddress: '',
                streetAddress2: '',
                city: '',
                state: '',
                zipcode: ''
            }
        },
        {
            type: 'phone',
            meta: {
                label: 'Phone Number'
            },
            data: {
                phone: ''
            }
        }
    ]
};

Template.catalogPreview = React.createClass({
    displayName: 'AboutPageCatalogPreview',
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