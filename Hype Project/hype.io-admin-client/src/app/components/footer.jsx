var React = require('react');

var Footer = React.createClass({
    displayName: 'Footer',

    render: function () {
        return (
            <footer className="clearfix">
                <div className="pull-right">
                    Crafted with <i className="fa fa-heart text-danger"></i> by <a href="http://hype.io" target="_blank">Hype.io</a>
                </div>
                <div className="pull-left">
                    Copyright &copy; 2015 <a href="http://hype.io" target="_blank">Hype.io</a>.  All rights reserved.
                </div>
            </footer>
        );
    }
});

module.exports = Footer;