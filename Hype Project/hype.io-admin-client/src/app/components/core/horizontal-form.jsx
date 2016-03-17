var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Button = Bootstrap.Button,
    ButtonToolbar = Bootstrap.ButtonToolbar,
    Col = Bootstrap.Col,
    HorizontalSubmit = require('./horizontal-submit.jsx');

var HorizontalForm = React.createClass({
    displayName: 'HorizontalForm',
    propTypes: {
        onSubmit: React.PropTypes.func.isRequired,
        onReset: React.PropTypes.func,
        name: React.PropTypes.string,
        submitText: React.PropTypes.string,
        resetText: React.PropTypes.string,
        submitIcon: React.PropTypes.string,
        resetIcon: React.PropTypes.string,
        shouldRenderSubmit: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            shouldRenderSubmit: true,
            submitText: 'Submit',
            resetText: 'Reset',
            submitIcon: 'upload',
            resetIcon: 'refresh'
        }
    },

    _submit: function(e) {
        if (e) {
            e.preventDefault();
        }

        this.props.onSubmit();
    },

    _reset: function(e) {
        if (e) {
            e.preventDefault();
        }

        if (this.props.onReset) {
            this.props.onReset();
        }
    },

    render: function() {
        return (
        <form className='form-horizontal' onSubmit={this._submit} id={this.props.id}>
        {this.props.children}
        {this.props.shouldRenderSubmit ? <HorizontalSubmit {...this.props} /> : null }
        </form>
        );
    }
});

module.exports = HorizontalForm;