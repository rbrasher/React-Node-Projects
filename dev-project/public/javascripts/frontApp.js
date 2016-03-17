var app = angular.module('DevProject', [
    'ngRoute'
]);

/**
 * Front end routes
 */
app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        //home
        .when("/", {
            templateUrl: "/parts/home.html",
            controller: "PageCtrl"
        })
        //Pages
        .when("/about", {
            templateUrl: "/parts/about.html",
            controller: "PageCtrl"
        })
        .when("/faq", {
            templateUrl: "/parts/faq.html",
            controller: "PageCtrl"
        })
        .when("/pricing", {
            templateUrl: "/parts/pricing.html",
            controller: "PageCtrl"
        })
        .when("/services", {
            templateUrl: "/parts/services.html",
            controller: "PageCtrl"
        })
        .when("/contact", {
            templateUrl: "/parts/contact.html",
            controller: "PageCtrl"
        })
        //Blog
        .when("/blog", {
            templateUrl: "/parts/blog.html",
            controller: "BlogCtrl"
        })
        .when("/blog/post", {
            templateUrl: "/parts/blog_item.html",
            controller: "BlogCtrl"
        })
        .when("/login", {
            templateUrl: "/parts/login.html",
            controller: "LoginCtrl"
        }).
        
        
        //admin pages
        when('/dashboard', {
            templateUrl: '/parts/admin/dashboard.html',
            controller: 'DashboardCtrl'
        }).
        when('/login', {
            templateUrl: 'parts/login.html',
            controller: 'LoginCtrl'
        }).
        when('/flot', {
            templateUrl: '/parts/admin/flot.html',
            controller: 'FlotCtrl'
        }).
        when('/morris', {
            templateUrl: '/parts/admin/morris.html',
            controller: 'MorrisCtrl'
        }).
        when('/tables', {
            templateUrl: '/parts/admin/tables.html',
            controller: 'TablesCtrl'
        }).
        when('/forms', {
            templateUrl: '/parts/admin/forms.html',
            controlller: 'FormsCtrl'
        }).
        when('/panels-wells', {
            templateUrl: '/parts/admin/panels-wells.html',
            controller: 'PanelsCtrl'
        }).
        when('/buttons', {
            templateUrl: '/parts/admin/buttons.html',
            controller: 'ButtonsCtrl'
        }).
        when('/notifications', {
            templateUrl: '/parts/admin/notifications.html',
            controller: 'NotificationsCtrl'
        }).
        when('/typography', {
            templateUrl: '/parts/admin/typography.html',
            controller: 'TypographyCtrl'
        }).
        when('/icons', {
            templateUrl: '/parts/admin/icons.html',
            controller: 'IconsCtrl'
        }).
        when('/grid', {
            templateUrl: '/parts/admin/grid.html',
            controller: 'GridCtrl'
        }).
        when('/blank', {
            templateUrl: '/parts/admin/blank.html',
            controller: 'BlankCtrl'
        })
        
        //else 404
        .otherwise("/404", {
            templateUrl: "/parts/404.html",
            controller: "PageCtrl"
        });
}]);

//Front end Controllers
app.controller('BlogCtrl', function($scope, $location, $http) {
    console.log("Blog Controller reporting for duty");
});

app.controller('PageCtrl', function($scope, $location, $http) {
    console.log("Page Controller reporting for duty");
    $scope.test = 'hello world';
    $scope.auth = true;
    $scope.username = 'RB';
    
    //Activates the carousel
    $('.carousel').carousel({
        interval: 5000
    });
    
    //Activates Tooltips for Social 
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    });
});

app.controller('LoginCtrl', function($scope, $location, $http) {
    console.log('LoginCtrl reporting for duty');
    
});


//Admin Controllers
app.controller('DashboardCtrl', ['$scope', function($scope) {
        
}]);

app.controller('FlotCtrl', ['$scope', function($scope) {
        
}]);

app.controller('MorrisCtrl', ['$scope', function($scope) {
        
}]);

app.controller('TablesCtrl', ['$scope', function($scope) {
        
}]);

app.controller('FormsCtrl', ['$scope', function($scope) {
        
}]);

app.controller('PanelsCtrl', ['$scope', function($scope) {
        
}]);

app.controller('ButtonsCtrl', ['$scope', function($scope) {
        
}]);

app.controller('NotificationsCtrl', ['$scope', function($scope) {
        
}]);

app.controller('TypographyCtrl', ['$scope', function($scope) {
        
}]);

app.controller('IconsCtrl', ['$scope', function($scope) {
        
}]);

app.controller('GridCtrl', ['$scope', function($scope) {
        
}]);

app.controller('BlankCtrl', ['$scope', function($scope) {
        
}]);

app.controller('SidebarCtrl', ['$scope', function($scope) {
        
}]);