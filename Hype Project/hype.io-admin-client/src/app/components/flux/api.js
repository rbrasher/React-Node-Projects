var Firebase = require('firebase'),
    ref = new Firebase('https://hype-io.firebaseio.com/'),
    request = require('superagent'),
    _ = require('lodash');

var _apiRoot = 'http://hypewebapi.azurewebsites.net';

// Todo: implement as promises
var Api = function() {

    function _getRequest(config) {
        var auth = ref.getAuth();
        if (!auth) {
            if (config.failure)
            {
                config.failure("Unauthorized");
            }
            if (config.always) {
                config.always();
            }
            return null;
        };

        var req = request(config.method || 'GET', _apiRoot + config.path)
            //.post(_apiRoot + config.path)
            .set('Authorization', 'Bearer ' + auth.token)
            .type('application/json');
            //.send(config.data)
            //.end(function (res) {
            //    if (res.ok) {
            //        if (config.success)
            //        {
            //            config.success(res);
            //        }
            //    } else {
            //        if (config.failure)
            //        {
            //            config.failure(res);
            //        }
            //    }
            //});

        _makePayload(req, config.data);
        _call(req, config.success, config.failure, config.always);

        return req;
    };

    function _makePayload(request, payload) {
        if (payload) {
            request.send(payload);
        }
    };

    function _call(request, success, failure, always) {
        request.end(function (res) {
            if (res.ok) {
                if (success)
                {
                    success(res.body);
                }
            } else {
                if (failure)
                {
                    failure(res.body);
                }
            }

            if (always) {
                always(res);
            }
        });
    };

    // config
    //  .path
    //  .data
    //  .success
    //  .failure
    //  .always
    function _post(config) {
        return _getRequest(_.defaults({method: 'POST'}, config));
    };

    function _get(config) {
        return _getRequest(_.defaults({method: 'GET'}, config));
    };

    function _del(config) {
        return _getRequest(_.defaults({method: 'DELETE'}, config));
    };

    function _put(config) {
        return _getRequest(_.defaults({method: 'PUT'}, config));
    };

    function _customMethod(config) {
        return _getRequest(config);
    }

    function _getFirebaseRoot() {
        var auth = ref.getAuth();
        if (!auth) {
            return null;
        };

        return ref.child(auth.uid);
    }

    return {
        post: _post,
        get: _get,
        put: _put,
        del: _del,

        create: _post,
        read: _get,
        update: _put,
        del: _del,

        custom: _customMethod,

        direct: _getFirebaseRoot
    };
}();

module.exports = Api;