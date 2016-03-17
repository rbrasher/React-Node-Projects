var React = require('react'),
    Search = require('./Search'),
    Map = require('./Map'),
    CurrentLocation = require('./CurrentLocation'),
    LocationList = require('./LocationList');

var App = React.createClass({

    getInitialState: function() {
        //extract the favorite locations from the local storage
        var favorites = [];

        if(localStorage.favorites) {
            favorites = JSON.parse(localStorage.favorites);
        };

        //set a default favorite location (Paris, France)
        return {
            favorites: favorites,
            currentAddress: 'Paris, France',
            mapCoordinates: {
                lat: 48.856614,
                lng: 2.3522219
            }
        };
    },

    toggleFavorite: function(address) {
        if(this.isAddressInFavorites(address)) {
            this.removeFromFavorites(address);
        } else {
            this.addToFavorites(address);
        }
    },

    addToFavorites: function(address) {
        var favorites = this.state.favorites;

        favorites.push({
            address: address,
            timestamp: Date.now()
        });

        this.setState({
            favorites: favorites
        });

        localStorage.favorites = JSON.stringify(favorites);
    },

    removeFromFavorites: function(address) {
        var favorites = this.state.favorites;

        var index = -1;

        for(var i = 0; i < favorites.length; i++) {
            if(favorites[i].address == address) {
                index = i;
                break;
            }
        }

        //if it was found, remove it from the favorites array
        if(index !== -1) {
            favorites.splice(index, 1);

            this.setState({
                favorites: favorites
            });

            localStorage.favorites = JSON.stringify(favorites);
        }
    },

    isAddressInFavorites: function(address) {
        var favorites = this.state.favorites;

        for(var i = 0; i < favorites.length; i++) {
            if(favorites[i].address === address) {
                return true;
            }
        }
        return false;
    },

    searchForAddress: function(address) {
        var self = this;

        //we will GMaps' geocode functionality,
        //which is built on top og Google Maps API.

        GMaps.geocode({
            address: address,
            callback: function(results, status) {
                if(status !== 'OK') return;

                var latlng = results[0].geometry.location;

                self.setState({
                    currentAddress: results[0].formatted_address,
                    mapCoordinates: {
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    }
                });
            }
        });
    },

    render: function() {

        return (
            <div>
                <h1>Your Locations</h1>

                <Search onSearch={this.searchForAddress} />

                <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />

                <CurrentLocation address={this.state.currentAddress} favorite={this.isAddressInFavorites} onFavoriteToggle={this.toggleFavorite} />

                <LocationList location={this.state.favorites} activeLocationAddress={this.state.currentAddress} onClick={this.searchForAddress} />
            </div>
        );

    }
});

module.exports = App;