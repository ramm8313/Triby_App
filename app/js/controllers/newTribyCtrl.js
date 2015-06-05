'use strict';
MyApp.controller('NewTribyCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, $ionicLoading, SettingsService, FeedService, $rootScope, $window) {

  $scope.triby = {
    pic : 'img/add_photo.png',
    name : '',
    members : []
  }

  $scope.uploadPicture = function(){
    $ionicLoading.show({
      template: 'Uploading...'
    });
    SettingsService.fileTo($rootScope.urlBackend + '/uploads',"TRIBY").then(function(response){
        $ionicLoading.hide();
      if(response.status == "success"){
        $scope.triby.pic = response.url_file;
      }
      else
        window.plugins.toast.showShortCenter("Error uploading picture", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    });
  };

  $scope.nextStep = function(){
    FeedService.setNewTriby($scope.triby);
    //$location.path('app/add_people');
    $window.location.href = "#/app/add_people";
  }
});
