var React = require('react'),
    Reflux = require('reflux'),
    Bootstrap = require('react-bootstrap'),
    Router = require('react-router'),
    RouterBootstrap = require('react-router-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    Library = require('../core/library'),
    Fonticon = Library.Fonticon,
    Form = Library.HorizontalForm,
    Input = Bootstrap.Input,
    Submit = Library.HorizontalSubmit;

var UserActions = require('../actions/user-actions.js');

var UserStore = require('../stores/user-store.js');
var ProfileStore = require('../stores/profile-store.js');

var Login = React.createClass({
    displayName: 'Login',
    mixins: [
        Router.Navigation,
        Reflux.ListenerMixin,
        React.addons.LinkedStateMixin
    ],

    getInitialState: function() {
        return {
            isBusy: false
        };
    },

    componentDidMount: function() {
        this.listenTo(UserStore, this._onUserChange);
        this.listenTo(UserActions.login.completed, this._onLoginCompleted);
        this.listenTo(UserActions.login.failed, this._onLoginFailed);
        this.listenTo(UserActions.login.always, this._onLoginAlways);
    },

    _onUserChange: function(user) {
        if (user.isLoggedIn) {
            this.context.router.transitionTo('root');
        }
    },

    _onLoginCompleted: function() {

    },

    _onLoginFailed: function() {
        this.setState({password: ''});
    },

    _onLoginAlways: function() {
        this.setState({isBusy: false});
    },

    _login: function(e){
        if (e) {
            e.preventDefault();
        }

        this.setState({isBusy: true});
        ProfileStore.setDefaultEmail(this.state.email);
        UserActions.login({email: this.state.email, password: this.state.password});
    },

    renderBusy: function() {
        if(!this.state.isBusy) {
            return <span />;
        }

        var ignoreOnRequestHide = function() { };

        return (
            <div className="busy">
                <div className="busy-container">
                    <i className="fa fa-spinner fa-3x fa-spin"></i>
                </div>
            </div>
        );
    },

    render: function () {
        return (
            <div className="container">
                <Row>
                    <Col md={12}>
                                 {/* <!-- Login Container --> */}
                        <div id="login-container">
                                 {/* <!-- Login Title --> */}
                            <div className="login-title text-center">
                                <h1>
                                    <strong>Login</strong>
                                    {/*&nbsp;or&nbsp;
                                    <strong>Register</strong>*/}
                                </h1>
                            </div>
                                 {/* <!-- END Login Title --> */}

                                 {/* <!-- Login Block --> */}
                            <div className="block push-bit">
                                 {/* <!-- Login Form --> */}
                                <Form onSubmit={this._login} submitText='Login to Dashboard' submitIcon='chevron-right' id='form-login' shouldRenderSubmit={false}>
                                    <div className="form-group">
                                        <Col xs={12}>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <Fonticon icon='envelope' />
                                                </span>
                                                <input type="text" id="login-email" name="login-email" className="form-control input-lg" placeholder="Email" valueLink={this.linkState('email')} />
                                            </div>
                                        </Col>
                                    </div>
                                    <div className="form-group">
                                        <Col xs={12}>
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <Fonticon icon='asterisk' />
                                                </span>
                                                <input type="password" id="login-password" name="login-password" className="form-control input-lg" placeholder="Password" valueLink={this.linkState('password')} />
                                            </div>
                                        </Col>
                                    </div>
                                    <div className="form-group form-actions">
                                        <Col xs={4}>
                                            <label className="switch switch-primary" data-toggle="tooltip" title="Remember Me?">
                                                <input type="checkbox" id="login-remember-me" name="login-remember-me" defaultChecked />
                                                <span></span>
                                            </label>
                                        </Col>
                                        <Col xs={8} className="text-right">
                                            <button onClick={this._login} className="btn btn-sm btn-primary">
                                                <Fonticon icon='chevron-right' />
                                                &nbsp;Login to Dashboard</button>
                                        </Col>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-12 text-center">
                                            <a href="javascript:void(0)" id="link-reminder-login">
                                                <small>Forgot password{'?'}</small>
                                            </a>
                                            {/*nbsp;-&nbsp;
                                             <a href="javascript:void(0)" id="link-register-login">
                                             <small>Create a new account</small>
                                             </a>*/}
                                        </div>
                                    </div>
                                </Form>
                                 {/* <!-- END Login Form --> */}

                                 {/* <!-- Reminder Form --> */}
                                <form action="login_alt.html#reminder" method="post" id="form-reminder" className="form-horizontal display-none">
                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <i className="gi gi-envelope"></i>
                                                </span>
                                                <input type="text" id="reminder-email" name="reminder-email" className="form-control input-lg" placeholder="Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-actions">
                                        <div className="col-xs-12 text-right">
                                            <button type="submit" className="btn btn-sm btn-primary">
                                                <i className="fa fa-angle-right"></i>
                                                Reset Password</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-12 text-center">
                                            <small>Did you remember your password***</small>
                                            <a href="javascript:void(0)" id="link-reminder">
                                                <small>Login</small>
                                            </a>
                                        </div>
                                    </div>
                                </form>
                                 {/* <!-- END Reminder Form --> */}
                            </div>
                                 {/* <!-- END Login Block --> */}
                        </div>
                                 {/* <!-- END Login Container --> */}
                    </Col>
                </Row>
                {this.renderBusy()}
            </div>

        );
    }
});

module.exports = Login;