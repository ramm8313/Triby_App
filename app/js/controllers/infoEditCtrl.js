'use strict';
MyApp.controller('InfoEditCtrl', function($scope, $location, $ionicLoading, FeedService, $rootScope, $stateParams, SettingsService, $window, $timeout, $route) {

  $scope.triby = {};
  FeedService.getTriby($stateParams.triby_id).then(function(response){
    $scope.triby = response.data.tribe;

  });

  $scope.showDone = "";
  var initializing = true
  $scope.$watch("triby.name", function(newValue, oldValue) {
    if(initializing){
      $timeout(function() { initializing = false; },500);
    }
    else{
      if (newValue != oldValue) {
        $scope.showDone = "Done";
      }
    }
  });
  $scope.$watch("triby.pic", function(newValue, oldValue) {
    if(initializing){
      $timeout(function() { initializing = false; },500);
    }
    else{
      if (newValue != oldValue) {
        $scope.showDone = "Done";
      }
    }
  });

  $scope.uploadPicture = function(){
    $ionicLoading.show({
      template: 'Uploading...'
    });
    SettingsService.fileTo($rootScope.urlBackend + '/uploads','AVATAR').then(function(response){

      if(response.status == "success"){
        $scope.triby.pic = response.url_file;
      }
      else
        window.plugins.toast.showShortCenter("Error uploading picture", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
      $ionicLoading.hide();
    });
  }

  $scope.saveTribyInfo = function(){

    FeedService.updateTriby($scope.triby).then(function(response){
      if(response.status=="success"){
        $timeout(function(){
          $window.location.href = "#/app/info/" + $scope.triby._id;
          $window.location.reload();
        }, 100);
      }
      else
        window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    });
  }

  $scope.goBack = function(){
    $timeout(function(){
      $window.location.href = "#/app/news_feed/" + $scope.triby._id;
    }, 100);
  }
});




