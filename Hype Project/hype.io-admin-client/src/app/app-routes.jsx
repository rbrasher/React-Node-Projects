var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NoRouteFound = Router.NotFoundRoute,
    Redirect = Router.Redirect;

var AppRoutes = (function () {
    function _getRouteTree() {
        return (
            <Route name='app'>
                <Route name='root' path='/' handler={require('./components/main.jsx')}>
                    <Route name='project' handler={require('./components/pages/project-home.jsx')}>
                        <Route name='project-add' path='add' handler={require('./components/pages/project/project-add.jsx')} />
                        <Route name='project-id' path=':projectId'>
                            <Route name='project-dashboard' path='dashboard' handler={require('./components/pages/project/project-dashboard.jsx')} />
                            <Route name='project-pages' path='pages' handler={require('./components/pages/project/project-pages.jsx')} />
                            <Route name='project-settings' path='settings' handler={require('./components/pages/project/project-settings.jsx')} />
                            <Route name='project-build-settings' path='build' handler={require('./components/pages/project/project-build-settings.jsx')} />
                            {/*<Route name='project-notifications' path='notifications' handler={require('./components/pages/project/project-notifications.jsx')} />
                            <Route name='project-users' path='users' handler={require('./components/pages/project/project-users.jsx')} />*/}
                        </Route>
                        <Redirect from='project' to='project-add' />
                    </Route>
                    <Route name='profile'>
                        <Route name='profile-edit' path='edit' handler={require('./components/pages/profile/profile-edit.jsx')} />
                        <Route name='profile-change-password' path='changepassword' handler={require('./components/pages/profile/profile-change-password.jsx')} />
                    </Route>
                    <DefaultRoute name='publisher-projects' handler={require('./components/pages/dashboard.jsx')} />
                </Route>
                <Route name='login' path='/login' handler={require('./components/pages/login.jsx')} />
            </Route>
        );
    }

    return _getRouteTree();
})();

module.exports = AppRoutes;