'use strict';
MyApp.controller('AddPeopleCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, $ionicLoading, SettingsService, FeedService, $rootScope, $window) {

  $ionicLoading.show({
      content: '<ion-spinner class="spinner-energized"></ion-spinner>'
    });
  $scope.contacts = [];
  SettingsService.getContactsLocal().then(function(response){
    if(Array.isArray(response)){
          $scope.contacts = response;
      }
    $ionicLoading.hide();
  });

  $scope.createTriby = function(){
    var triby = FeedService.getNewTriby();
    triby.members = [];
    for(var i=0; i < $scope.contacts.length; i++){
      if($scope.contacts[i].checked)
        triby.members.push($scope.contacts[i].username);
    }
    FeedService.saveTriby(triby).then(function(response){
      console.log(JSON.stringify(response));
      if(response.status=="success"){
        window.plugins.toast.showShortCenter("New Triby created successfully", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});

        $timeout(function(){
          $window.location.href = "#/app/main/home";
        }, 100);
      }
      else
        window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    });
  }
});


