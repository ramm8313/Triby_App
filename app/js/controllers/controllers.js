'use strict';
MyApp.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, UserService, $rootScope) {

  /*$scope.$watch('params.count', function(){
    console.log($rootScope.params.count);
  });*/

  $scope.go = function(path){
    $location.path( path );
  };

  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Facebook user?
  $scope.isFacebookUser = function() {
    console.log(UserService.getMobileNumber());
    return UserService.getMobileNumber() === '';
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  if($location.path().indexOf("about") >= 0)
    $scope.hide_bar = true;
})

.controller('AboutCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location) {
  $scope.hide_bar = true;
})

.controller('NewsFeedCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location) {

  $scope.feeds = [
    {
      "likes":50,
      "hearth":50,
      "dislikes":0,
      "messages":true,
      "chatMessages":0
    },
    {
      "likes":0,
      "hearth":0,
      "dislikes":1,
      "messages":false,
      "chatMessages":100
    },
  ];

  $scope.getHandUp = function(index){
    if($scope.feeds[index].likes > 0)
      return "img/hand-up.png";
    else
      return "img/hand-up-grey.png";
  }
  $scope.getHearth = function(index){
    if($scope.feeds[index].hearth > 0)
      return "img/heart.png";
    else
      return "img/heart-grey.png";
  }
  $scope.getHandDown = function(index){
    if($scope.feeds[index].dislikes > 0)
      return "img/hand-down.png";
    else
      return "img/hand-down-grey.png";
  }
  $scope.addLike = function(index){
    $scope.feeds[index].likes += 1;
  }
  $scope.addHearth = function(index){
    $scope.feeds[index].hearth += 1;
  }
  $scope.addDislike = function(index){
    $scope.feeds[index].dislikes += 1;
  }
})

.controller('AccountCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location) {

  $scope.old =  {number: "1", name: 'old_number'};
  $scope.new =  {number: "1", name: 'new_number'};
  $scope.notifications = {
    popUpNotifications: false,
    commentsNotifications: false,
    sideCommentsNotications : false
  }

  $scope.delete_account = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete account',
      template: 'Are you sure you want to delete your account?'
    });
    confirmPopup.then(function(res) {
      if(res)
        navigator.app.exitApp();
    });
  }

  $scope.switchPopUp = function(){
    $scope.notifications.popUpNotifications = !$scope.notifications.popUpNotifications;
  }

  $scope.switchComments = function(){
    $scope.notifications.commentsNotifications = !$scope.notifications.commentsNotifications;
  }

  $scope.switchSideComments = function(){
    $scope.notifications.sideCommentsNotications = !$scope.notifications.sideCommentsNotications;
  }
})

.directive('numberOnlyInput', function () {
    return {
        restrict: 'EA',
        template: '<input name="{{inputName}}" ng-model="inputValue" placeholder="{{placeholder}}" />',
        scope: {
            inputValue: '=',
            inputName: '=',
            placeholder: "="
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (!newValue) return;
                if (arr.length === 0) return;
                if (arr.length === 1 && newValue === '+') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
})

.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
        cordova.plugins.Keyboard.show();
      }, 150);
    }
  };
});
