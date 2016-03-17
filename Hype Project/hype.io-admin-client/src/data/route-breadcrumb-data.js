var React = require('react');

var routeData = {
    app: {
        breadcrumb: '~'
    },
    root: {
        breadcrumb: (<i className='gi gi-home'></i>)
    },
    project: {
        breadcrumb: 'Project',
        contextMenu: require('../app/components/navigation/project-context-menu.jsx')
    },
    "project-pages": {
        breadcrumb: 'Pages'
    },
    "project-dashboard": {
        breadcrumb: 'Dashboard'
    },
    "project-add": {
        breadcrumb: 'New Project'
    },
    "publisher-projects": {
        breadcrumb: "Publisher Dashboard"
    },
    "profile": {
        breadcrumb: "Profile"
    },
    "profile-edit": {
        breadcrumb: "Edit"
    }
}

module.exports = routeData;