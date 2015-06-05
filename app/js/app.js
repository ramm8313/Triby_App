// Ionic Starter App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var MyApp = angular.module('MyApp', ['ionic','LocalStorageModule','openfb','ngRoute','ngCordova']);

MyApp.config(['$ionicConfigProvider','$compileProvider','$sceDelegateProvider', function ($ionicConfigProvider,$compileProvider,$sceDelegateProvider){
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.navBar.positionPrimaryButtons('left');
  $ionicConfigProvider.navBar.positionSecondaryButtons('right');
  // Set the whitelist for certain URLs just to be safe
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data|http|blob):/);
  $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
}]);

MyApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html'
  })
    .state('signup_step1', {
      url: '/signup_1',
      templateUrl: 'templates/signup-step-1.html'
    })
    .state('signup_step2', {
      url: '/signup_2',
      templateUrl: 'templates/signup-step-2.html'
    })
    .state('login_facebook', {
      url: '/login_facebook',
      templateUrl: 'templates/login_facebook.html',
      controller: 'AppCtrl'
    })
    .state('confirm', {
      url: '/confirm',
      templateUrl: 'templates/signup-step-3.html'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/container.html',
      controller: 'AppCtrl'
    })
    .state('app.main', {
      url:'/main',
      views: {
        'menuContent' :{
          templateUrl: 'templates/main.html',
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.main.home', {
      url:'/home',
      views: {
        'tab-home' :{
          templateUrl: 'templates/home.html',
          controller:'HomeCtrl'
        }
      },
      resolve: {
          FeedService: 'FeedService',
          tribes : function(FeedService, $stateParams, $ionicLoading, $q){
              $ionicLoading.show({
                  content: '<ion-spinner class="spinner-energized"></ion-spinner>'
              });
              var deffered = $q.defer();
              FeedService.getTribes().then(function(response){
                  deffered.resolve(response);
                  $ionicLoading.hide();
              }, function(err){
                  alert(err.data);
                  deffered.reject(err);
                  $ionicLoading.hide();
              });
              return deffered.promise;
          }
      }
    })
    .state('app.noti', {
      url:'/noti',
      views: {
        'menuContent' :{
          templateUrl: 'templates/noti.html',
          controller:'AppCtrl'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html'
        }
      }
    })
    .state('app.news_feed', {
      url: '/news_feed/:triby_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/news_feed.html',
          controller: "FeedCtrl"
        }
      },
      resolve: {
          FeedService: 'FeedService',
          triby : function(FeedService, $stateParams, $ionicLoading, $q){
              $ionicLoading.show({
                  content: '<ion-spinner class="spinner-energized"></ion-spinner>'
              });
              var deffered = $q.defer();
              FeedService.getTriby($stateParams.triby_id).then(function(response){
                  deffered.resolve(response);
                  $ionicLoading.hide();
              }, function(err){
                  alert(err.data);
                  deffered.reject(err);
                  $ionicLoading.hide();
              });
              return deffered.promise;
          }
          }
    })
    .state('app.comments', {
      url: '/comments/:post_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/comments.html',
          controller:"CommentsCtrl"
        }
      }
    })
    .state('app.comments_side', {
      url: '/comments_side/:sidechat_id/:user_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/comments_side.html',
          controller:"ChatCtrl"
        }
      }
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/chat.html'
        }
      }
    })
    .state('app.add_members', {
      url: '/add_members',
      views: {
        'menuContent': {
          templateUrl: 'templates/add_members.html'
        }
      }
    })
    .state('app.new_triby', {
      url: '/new_triby',
      views: {
        'menuContent': {
          templateUrl: 'templates/new_triby.html'
        }
      }
    })
    .state('app.add_people', {
      url: '/add_people',
      views: {
        'menuContent': {
          templateUrl: 'templates/add_people.html'
        }
      }
    })
    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: "HomeCtrl"
        }
      },
      resolve: {
          FeedService: 'FeedService',
          tribes : function(FeedService, $stateParams, $ionicLoading, $q){
              $ionicLoading.show({
                  content: '<ion-spinner class="spinner-energized"></ion-spinner>'
              });
              var deffered = $q.defer();
              FeedService.getTribes().then(function(response){
                  deffered.resolve(response);
                  $ionicLoading.hide();
              }, function(err){
                  alert(err.data);
                  deffered.reject(err);
                  $ionicLoading.hide();
              });
              return deffered.promise;
          }
      }
    })
    .state('app.tribys', {
      url: '/tribys',
      views: {
        'menuContent': {
          templateUrl: 'templates/tribys.html'
        }
      }
    })
    .state('app.info', {
      url: '/info/:triby_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/info.html'
        }
      }
    })
    .state('app.edit_info', {
      url: '/edit_info/:triby_id',
      views: {
        'menuContent': {
          templateUrl: 'templates/edit_info.html'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html'
        }
      }
    })
    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html'
        }
      }
    })
    .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html'
        }
      }
    })
    .state('app.change_number', {
      url: '/change_number',
      views: {
        'menuContent': {
          templateUrl: 'templates/change_number.html'
        }
      }
    })
    .state('app.delete_account', {
      url: '/delete_account',
      views: {
        'menuContent': {
          templateUrl: 'templates/delete_account.html'
        }
      }
    })
    .state('app.notifications', {
      url: '/notifications',
      views: {
        'menuContent': {
          templateUrl: 'templates/notifications.html'
        }
      }
    })
    .state('app.feedback', {
      url: '/feedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/feedback.html'
        }
      }
    })
    .state('app.terms', {
      url: '/terms',
      views: {
        'menuContent': {
          templateUrl: 'templates/terms.html'
        }
      }
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('app.mural', {
      url: '/mural/:triby_info',
      views: {
        'menuContent': {
          templateUrl: 'templates/mural.html',
          controller: 'MuralCtrl'
        }
      }
    })
    .state('mural_details', {
      url: '/mural_details',
      templateUrl: 'templates/mural_details.html'
    })
    .state('app.main.no_connection', {
      url:'/no_connection',
      views: {
        'tab-home' :{
          templateUrl: 'templates/no_connection.html',
          controller:'AppCtrl'
        }
      }
    })
   .state('app.server_connection_error', {
      url:'/server_connection',
      views: {
          'menuContent' :{
              templateUrl: 'templates/server_connection_error.html'
          }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signup');

  $httpProvider.interceptors.push('authInterceptor');
});

MyApp.factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');
            if (authData && authData.token) {
                config.headers.Authorization = authData.token;
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if(response.status === 0) {
                $location.path('app/server_connection');
                return $q.reject(response);
            }
            if(response.status === 401) {
                $location.path('signup');
                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        }
    };
});

MyApp.run(function($ionicPlatform,$rootScope,UserService,$cordovaSplashscreen,$ionicPopup,OpenFB,$location,$state,$ionicLoading) {

  $rootScope.params = {count: 0};
  $rootScope.params.increment = function(){
    $rootScope.params.count++;
  };

  // this is a old one OpenFB.init('585883268214163','http://localhost:8100/oauthcallback.html', window.localStorage);
  //OpenFB.init('336119189918118','http://localhost:8100/oauthcallback.html', window.localStorage);
  OpenFB.init('738821969512630','http://localhost:8100/oauthcallback.html', window.localStorage);
  $rootScope.urlBackend = 'http://104.236.5.153:3000';
  //$rootScope.urlBackend = 'http://192.168.1.104:3000';

  $rootScope.Get_Width=function(index)
  {
    if(index%3==0)
      return '100%';
    else
      return '50%';
  };
  $rootScope.Get_PaddingLeft=function(index)
  {
    if(index%3==0 || index%3==1)
      return '0px';
    else
      return '3px';
  };

  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.main.home"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $state.go('app.main.no_connection');
      }
      document.addEventListener("offline", function() {
        $state.go('app.main.no_connection');
      }, false);
      document.addEventListener("online", function() {
        if(UserService.isAuthorized()){
            $state.go('app.main.home');
        }
        else $state.go('signup');
      }, false);
    }
      console.log("Checking user..");
    if(!UserService.isAuthorized()){
      console.log("Not authorized");
      $cordovaSplashscreen.hide();
    }
      else if(UserService.isAuthorized()){
        $ionicLoading.show({
            content: '<ion-spinner class="spinner-energized"></ion-spinner>'
        });
        if(UserService.getAuthData().type == 'facebook'){
        OpenFB.login('email,user_friends').then(
            function () {
                $cordovaSplashscreen.hide();
                var aUser = {};
                OpenFB.get('/me').success(function (user) {
                    aUser.id = user.id;
                    aUser.name = user.name;
                    aUser.email = user.email;
                    OpenFB.get('/me/picture',{
                        "redirect": false,
                        "height": 80,
                        "width": 80,
                        "type": "normal"
                    }).success(function(response){
                        aUser.image = response.data.url;
                        UserService.loginUserFacebook(aUser).then(function(response){
                            console.log("UserService.loginUserFacebook success response :", response);
                            $ionicLoading.hide();
                            $cordovaSplashscreen.hide();
                            if(response.status == "success")
                            {
                                $state.go('app.main.home');
                                console.log("Facebook login success...");
                            }
                        });
                    });

                });
            },
            function () {
                alert('Facebook login failed check your internet connection');
                $ionicLoading.hide();
            });
        }
        else{
                UserService.loginUser().then(function(response){
                    $cordovaSplashscreen.hide();
                    $ionicLoading.hide();
                    console.log("loginUser if Authorized response :", response);
                    console.log("loginUser if Authorized response.message :",response.message);
                    if(response.status == "success"){
                        $state.go('app.main.home');
                    }
                });
            }
    }
  });
});
