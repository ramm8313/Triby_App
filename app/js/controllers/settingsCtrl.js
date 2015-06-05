'use strict';
MyApp.controller('SettingsCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, SettingsService, UserService, $rootScope, $ionicLoading) {

	$ionicLoading.show({
        content: '<ion-spinner class="spinner-energized"></ion-spinner>'
	});

	$scope.user_data = {
		image : '',
		name : '',
		city : '',
        country : ''
	};

    // Facebook user?
    $scope.isFacebookUser = function() {
        return UserService.getAuthData().isAuth;
    };

	UserService.getUser().then(function(response){
		$scope.user_data = {
			name : response.data.user.name,
            username : response.data.user.username,
			city : response.data.user.city,
            country : response.data.user.country
		};
		if(response.data.user.pic)
			$scope.user_data.image = response.data.user.pic;
		else
			$scope.user_data.image = 'img/default_avatar.jpg';
		$ionicLoading.hide();
	});


	$scope.uploadPicture = function(){
		SettingsService.fileTo($rootScope.urlBackend + '/uploads','AVATAR').then(function(response){

			if(response.status === 'success'){
				$scope.user_data.image = response.url_file;
			}
			else
				window.plugins.toast.showShortCenter("Error uploading picture", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
			
		});
	}

	$scope.saveProfile = function(){
		SettingsService.saveProfile($scope.user_data).then(function(response){
			console.log(response.status);
			if(response.status == "success"){
				$location.path('app/settings');
			}
			else
				window.plugins.toast.showShortCenter("Error saving profile", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		});
	}
});

MyApp.controller('ChangeNumberCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, SettingsService,$window) {

	$scope.numbers = {
		old_number : "",
		new_number : ""
	}

	$scope.changeNumbers = function(){
		SettingsService.changeNumbers($scope.numbers).then(function(response){

			if(response.status == "success")
				$window.location.href = "#/app/settings";
			
			window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		});
	}

});

MyApp.controller('FeedbackCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, SettingsService, $window) {


	$scope.feedback = {
		text : "",
		stars : [0,0,0,0,0],
		score: 0
	}

	$scope.showDone = $scope.score > 0 || $scope.feedback.text.length > 0;

	$scope.addStar = function(index){
		for(var i=0; i <= index; i++){
			$scope.feedback.stars[i] = 1;
		}
			
		for(var i=(index+1); i <= 4; i++){
			$scope.feedback.stars[i] = 0;
		}
	}

	function getScore(stars){
		var score = 0;
		for(var i=0; i < 5; i++){
			if(stars[i] == 1)
				score += 2;
		}
		return score;
	}

	$scope.saveFeedback = function(){
		$scope.feedback.score = getScore($scope.feedback.stars);
		SettingsService.saveFeedback($scope.feedback).then(function(response){
			if(response.status == "success"){
				$window.location.href = "#/app/settings";
				window.plugins.toast.showShortCenter("Thank you for your feedback!", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
			}
			else
				window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		});	
	}

});

MyApp.controller('DeleteNumberCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, SettingsService,$window) {

	$scope.numbers = {
		old_number : ""
	}

	$scope.deleteUser = function(){
		SettingsService.removeUser($scope.numbers).then(function(response){
			console.log(response);
			if(response.status == "success")
				navigator.app.exitApp();
			
			window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		});
	}

});

MyApp.controller('ContactsCtrl', function($scope, $ionicModal, $timeout, $location, SettingsService,$window) {

	$scope.contacts = SettingsService.getContactsLocal();

	$scope.getContacts = function(){
		var obj = new ContactFindOptions();
        obj.filter = "";
        obj.multiple = true;

        console.log("navigator.contacts: " + navigator.contacts);
        var fields = ["id","displayName","phoneNumbers"];
        navigator.contacts.find(fields, contacts_success, contacts_fail, obj);
	};

	function contacts_success(contacts) {
		var lstContacts = [];

		for (var i=0; i<contacts.length; i++)
        {
        	if( contacts[i].phoneNumbers == null )
            continue;

        	if(contacts[i].phoneNumbers.length)
        		for (var j=0; j<contacts[i].phoneNumbers.length; j++){
        			 var pNumber = contacts[i].phoneNumbers[j].value;
        			 pNumber = pNumber.replace(/\s+/g, "")
        			 var name = contacts[i].displayName != null ? contacts[i].displayName: "No name";
        			 lstContacts.push(pNumber);
        		}
        	
        }

        // Get triby concats from mobile directory
        SettingsService.getContacts({"contacts":lstContacts}).then(function(response){
        	$scope.contacts = response.users;
        	console.log(JSON.stringify(response));
        });
    }

    function contacts_fail(msg) {
        console.log("get_contacts() Error: " + msg);
    }

});