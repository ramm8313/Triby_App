'use strict';
MyApp.controller('AddMembersCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, $ionicLoading, SettingsService, FeedService, $rootScope, $window, UserService, $state) {

    $scope.contacts = [];
    $ionicLoading.show({
        content: '<ion-spinner class="spinner-energized"></ion-spinner>'
    });

    // get contacts for add in triby
    SettingsService.getContactsLocal().then(function(contacts){
        var triby = FeedService.getNewTriby();
        for(var i=0; i < contacts.length; i++){
            contacts[i].checked = triby.members.indexOf(contacts[i].username) >= 0;
        }
        $scope.contacts = contacts;
        $ionicLoading.hide();
    }, function(){
        $ionicLoading.hide();
    });

    // update triby
    $scope.updateTriby = function(){
        $ionicLoading.show({
            content: '<ion-spinner class="spinner-energized"></ion-spinner>'
        });
        var triby = FeedService.getNewTriby();
        triby.members = [];
        for(var i=0; i < $scope.contacts.length; i++){
            if($scope.contacts[i].checked)
                triby.members.push($scope.contacts[i].username);
        }
        FeedService.updateTriby(triby).then(function(response){
            $ionicLoading.hide();
            if(response.status=="success"){
                $timeout(function(){
                    $state.go("app.info",{triby_id: triby._id});
                }, 100);
            }
            else
                $ionicLoading.hide();
            window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
        });
    };

    // go to triby info page
    $scope.goBack = function(){
        $timeout(function(){
            $state.go("app.info",{triby_id: triby._id});
        }, 100);
    }
});

