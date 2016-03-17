var React = require('react'),
    Bootstrap = require('react-bootstrap'),
    Input = Bootstrap.Input;

var HorizontalInput = React.createClass({
    displayName: 'HorizontalInput',

    render: function() {
        //var { groupClassName, labelClassName, wrapperClassName, ...other } = this.props;

        return (
            <Input groupClassName='form-group' labelClassName='col-md-3 control-label' wrapperClassName='col-md-9' {...this.props} />
        );
    }
});

module.exports = HorizontalInput;