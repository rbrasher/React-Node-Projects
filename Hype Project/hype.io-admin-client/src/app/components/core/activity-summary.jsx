var React = require('react');

var ActivitySummary = React.createClass({
    displayName: "ActivitySummary",

    propTypes: {
        items: React.PropTypes.array.isRequired
    },

    _getNoActivity: function() {
        return (
            <div className="alert alert-success alert-alt">
                <i className="fa fa-circle-o fa-fw"></i>&nbsp;
                No activity
            </div>
        );
    },

    _getActivities: function() {
        if (this.props.items.length == 0)
        {
            return this._getNoActivity();
        }
    },

    render: function () {
        return (
            <div>
                <div className="sidebar-header sidebar-nav-mini-hide">
                    <span className="sidebar-header-options clearfix">
                        <a href="javascript:void(0)" data-toggle="tooltip" title="Refresh">
                            <i className="gi gi-refresh"></i>
                        </a>
                    </span>
                    <span className="sidebar-header-title">Recent Activity</span>
                </div>
                <div className="sidebar-section sidebar-nav-mini-hide">
                {this._getActivities()}
                </div>
            </div>
        );
    }
});

module.exports = ActivitySummary;