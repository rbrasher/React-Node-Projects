var React = require('react');

var Fonticon = React.createClass({
    displayName: 'Fonticon',
    getDefaultProps: function() {
        return {
            library: 'gi'
        }
    },
    propTypes: {
        icon: React.PropTypes.string.isRequired
    },

    render: function() {
        var cls = this.props.library + ' ' + this.props.library + '-' + this.props.icon;

        if (this.props.className)
        {
            cls += ' ' + this.props.className;
        }

        return (
            <i className={cls} />
        );
    }
});

module.exports = Fonticon;