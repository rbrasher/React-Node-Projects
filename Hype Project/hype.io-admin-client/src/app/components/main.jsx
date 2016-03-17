var React = require('react/addons'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    _ = require('lodash'),
    Bootstrap = require('react-bootstrap'),
    Footer = require('./footer.jsx'),
    Sidebar = require('./core/sidebar.jsx'),
    SidebarItem = require('./core/sidebar-item.jsx'),
    UserStore = require('./stores/user-store.js'),
    ProfileStore = require('./stores/profile-store'),
    routeData = require('../../data/route-breadcrumb-data.js');

var sidebarItems = [
    {
        route: 'publisher-projects',
        text: 'Publisher Dashboard',
        type: SidebarItem.Types.LINK,
        iconClassName: 'gi gi-show_big_thumbnails'
    },
    {text: 'Projects', type: SidebarItem.Types.HEADER},
    {route: 'project-add', text: 'New Project', type: SidebarItem.Types.LINK, iconClassName: 'gi gi-plus'}
];

var page, pageContent, header, footer, sidebar, sScroll, sidebarAlt, sScrollAlt;

var Main = React.createClass({
    displayName: "Main",
    mixins: [
        Router.Navigation,
        Reflux.ListenerMixin
    ],

    getInitialState: function () {
        return {
            user: UserStore.getUser()
        };
    },

    _onUserChanged: function (user) {
        this.setState({
            user: user
        });
    },

    _getContextMenu: function () {
        var menus = [];

        this.context.router.getCurrentRoutes().map(function (route, idx) {
            var routeDescription = routeData[route.name] || {},
                ContextMenu = routeDescription.contextMenu;

            if (ContextMenu) {
                menus.push(
                    <ContextMenu key={route.name} />
                );
            }
        });

        return _(menus).reverse().value();
    },


    render: function () {
        if (!this.state.user.isLoggedIn) {
            this.context.router.transitionTo('login');
        }

        return (
            <div id='page-wrapper'>
                <div id='page-container' className='sidebar-partial sidebar-visible-lg sidebar-no-animations style-alt'>

                    <Sidebar items={sidebarItems} />

                    <div id='main-container'>
                        <header className="navbar navbar-default">
                            <div className='navbar-header'>
                                <ul className="nav navbar-nav-custom">
                                    <li>
                                        <a href="javascript:void(0)" onclick="App.sidebar('toggle-sidebar');
                                        this.blur();">

                                            <i className="fa fa-bars fa-fw"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {this._getContextMenu()}

                        </header>

                        <div id='page-content'>
                            <RouteHandler />
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        );
    },

    _resizePageContent: function () {
        //console.log('Main._resizePageContent()');

        var windowH = $(window).height();
        var sidebarH = $('#sidebar').outerHeight();
        var sidebarAltH = $('#sidebar-alt').outerHeight();
        var headerH = $('header').outerHeight();
        var footerH = $('#page-content + footer').outerHeight();
        //var sidebarH        = sidebar.outerHeight();
        //var sidebarAltH     = sidebarAlt.outerHeight();
        //var headerH         = header.outerHeight();
        //var footerH         = footer.outerHeight();

        //console.log({windowH: windowH, sidebarH: sidebarH, sidebarAltH: sidebarAltH, headerH: headerH, footerH: footerH});

        // If we have a fixed sidebar/header layout or each sidebars’ height < window height
        if (header.hasClass('navbar-fixed-top') || header.hasClass('navbar-fixed-bottom') || ((sidebarH < windowH) && (sidebarAltH < windowH))) {
            if (page.hasClass('footer-fixed')) { // if footer is fixed don't remove its height
                pageContent.css('min-height', windowH - headerH + 'px');
            } else { // else if footer is static, remove its height
                pageContent.css('min-height', windowH - (headerH + footerH) + 'px');
            }
        } else { // In any other case set #page-content height the same as biggest sidebar's height
            if (page.hasClass('footer-fixed')) { // if footer is fixed don't remove its height
                pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - headerH + 'px');
            } else { // else if footer is static, remove its height
                pageContent.css('min-height', ((sidebarH > sidebarAltH) ? sidebarH : sidebarAltH) - (headerH + footerH) + 'px');
            }
        }
    },

    componentDidMount: function () {
        //console.log('Main.componentDidMount()');

        page = $('#page-container');
        pageContent = $('#page-content');
        header = $('header');
        footer = $('#page-content + footer');

        sidebar = $('#sidebar');
        sScroll = $('#sidebar-scroll');

        sidebarAlt = $('#sidebar-alt');
        sScrollAlt = $('#sidebar-alt-scroll');

        window.addEventListener('resize', this._resizePageContent);
        window.addEventListener('orientationchange', this._resizePageContent);
        this._resizePageContent();

        this.listenTo(UserStore, this._onUserChanged);
    },

    componentWillUnmount: function () {
        window.removeEventListener('resize', this._resizePageContent);
        window.removeEventListener('orientationchange', this._resizePageContent);
    },

    componentDidUpdate: function () {
        //console.log('Main.componentDidUpdate()');
        this._resizePageContent();
    },

    _handleTouchTap: function () {
        this.refs.leftNav.toggle();
    }

});

module.exports = Main;