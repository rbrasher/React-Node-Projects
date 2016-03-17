/**
 * Created by ron on 4/24/2015.
 */
var React = require('react');

var Map = React.createClass({

    componentDidMount: function() {
        //only componentDidMount is called when the component is first added to
        //the page. This is why we are calling the following method manually.
        //This makes sure that our map initialization code is run the first time.

        this.componentDidUpdate();
    },

    componentDidUpdate: function() {
        if(this.lastLat == this.props.lat && this.lastLng == this.props.lng) {
            //the map has already been initialized at this address.
            //Returns from this method so that we don't re-initialize it
            //(and cause it ti flicker)
            return;
        }

        this.lastLat = this.props.lat;
        this.lastLng = this.props.lng;

        var map = new GMaps({
            el: '#map',
            lat: this.props.lat,
            lng: this.props.lng
        });

        //adding a marker to the location we are showing
        map.addMarker({
            lat: this.props.lat,
            lng: this.props.lng
        });
    },

    render: function() {
        return (
            <div className="map-holder">
                <p>Loading...</p>
                <div id="map"></div>
            </div>
        );
    }
});

module.exports = Map;