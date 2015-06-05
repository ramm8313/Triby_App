'use strict';
MyApp.controller('InfoCtrl', function($window, $timeout, $scope, $location, $ionicLoading, FeedService, $rootScope, $stateParams, UserService, $ionicPopup) {

  $scope.triby = {};
    $ionicLoading.show({
        content: '<ion-spinner class="spinner-energized"></ion-spinner>'
    });
  FeedService.getTriby($stateParams.triby_id).then(function(response){
    $scope.triby = response.data.tribe;
    var members = $scope.triby.members;
    $scope.triby.users = [];
    for(var i=0; i < members.length; i++)
      UserService.getUser(members[i]).then(function(response){
        $scope.triby.users.push(response.data.user)
      });
    $ionicLoading.hide();
    FeedService.setNewTriby($scope.triby);
  });

  $scope.exitTriby = function(tribyId){
      $ionicLoading.show({
          content: '<ion-spinner class="spinner-energized"></ion-spinner>'
      });
    FeedService.exitTriby(tribyId).then(function(response){
      if(response.status === 'success'){
        $timeout(function(){
          $ionicLoading.hide();
          $window.location.href = "#/app/main/home";
          $window.location.reload();
        }, 100);
      }
      else
        $ionicLoading.hide();
        window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    });
  }
});



