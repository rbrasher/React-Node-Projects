var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Col = Bootstrap.Col,
    ButtonToolbar = Bootstrap.ButtonToolbar,
    Button = Bootstrap.Button,
    Fonticon = require('./fonticon.jsx');

var HorizontalSubmit = React.createClass({
    displayName: 'HorizontalSubmit',
    propTypes: {
        submitText: React.PropTypes.string,
        resetText: React.PropTypes.string,
        submitIcon: React.PropTypes.string,
        resetIcon: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            onSubmit: React.PropTypes.func,
            onReset: React.PropTypes.func,
            submitText: 'Submit',
            resetText: 'Reset',
            submitIcon: 'upload',
            resetIcon: 'refresh'
        }
    },

    _renderButtons: function() {
        var buttons = [];

        buttons.push(<Button onClick={this.props.onSubmit} bsStyle='primary' key='submit'>{this.props.submitIcon ? <Fonticon icon={this.props.submitIcon} /> : null} {this.props.submitText}</Button>);

        if (this.props.onReset) {
            buttons.push(<Button onClick={this.props.onReset} bsStyle='warning' key='reset'>{this.props.resetIcon ? <Fonticon icon={this.props.resetIcon} /> : null} {this.props.resetText}</Button>);
        }

        return buttons;
    },

    render: function() {
        return (
            <div className="form-group form-actions">
                <Col md={9} mdOffset={3}>
                    <ButtonToolbar>
                    {this._renderButtons()}
                    </ButtonToolbar>
                </Col>
            </div>
        );
    }
});

module.exports = HorizontalSubmit;