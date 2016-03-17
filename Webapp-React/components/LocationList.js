/**
 * Created by ron on 4/24/2015.
 */
var React = require('react'),
    LocationItem = require('./LocationItem');

var LocationList = React.createClass({

    render: function() {
        console.log(this.props);
        var self = this;

        var locations = this.props.location.map(function(l) {
            var active = self.props.activeLocationAddress == l.address;
            //get the index of the location or else we get a React warning
            var index = self.props.location.indexOf(l);

            //Notice that we are passing the onClick callback of this
            //LocationList to each LocationItem

            return <LocationItem address={l.address} timestamp={l.timestamp} active={active} onClick={self.props.onClick} key={index} />

        });

        if(!locations.length) {
            return null;
        };

        return (
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <span className="list-group-item active">Saved Locations</span>
                {locations}
            </div>
        );
    }
});

module.exports = LocationList;