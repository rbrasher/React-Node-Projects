var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    bs = require('react-bootstrap'),
    Breadcrumbs = require('../core/breadcrumbs.jsx');

var ContentPage = React.createClass({
    displayName: 'ContentPage',

    propTypes: {
        title: React.PropTypes.string.isRequired,
        subTitle: React.PropTypes.string,
        breadcrumbs: React.PropTypes.array,
        icon: React.PropTypes.string
    },

    render: function () {
        return (
            <div>
                <div className="content-header">
                    <div className="header-section">
                        <h1>
                            <i className={this.props.icon}></i>
                        {this.props.title}
                            <br />
                            <small>{this.props.subTitle}</small>
                        </h1>
                    </div>
                </div>

                {/*<Breadcrumbs />*/}

                <div className="block block-alt-noborder">
                {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = ContentPage;