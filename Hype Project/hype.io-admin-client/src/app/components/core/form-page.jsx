var React = require('react');

var FormPage = React.createClass({
    displayName: 'FormPage',
    propTypes: {},
    mixins: [],

    getInitialState: function () {
        return {};
    },
    getDefaultProps: function () {
        return {};
    },

    componentWillMount: function () {
    },
    componentWillReceiveProps: function () {
    },
    componentWillUnmount: function () {
    },

    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = FormPage;