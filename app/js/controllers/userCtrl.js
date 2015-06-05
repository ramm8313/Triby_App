'use strict';
MyApp.controller('UserCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, UserService, $window, $cordovaDevice, OpenFB, $cordovaSplashscreen, $state,CountryCodeService, $ionicLoading) {

  $scope.signupData = {
    username: "",
    countryCode: "",
    phone: "",
    country: ""
  };

  $scope.countries = CountryCodeService.getCountryCode();
  $scope.texto = 'Hello World!';
  $scope.fbLogin = function(){
      $ionicLoading.show({
          content: '<ion-spinner class="spinner-energized"></ion-spinner>'
      });
    OpenFB.login('email,user_friends').then(
      function () {
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
              if(response.status == "success")
              {
                //$location.path('app/main/home');
                $state.go('app.main.home');
                console.log("Facebook login success...");
              }
            });
          });

        });
      },
      function () {
        alert('OpenFB login failed');
      });
  };

  $scope.loginFacebook = function(){
    console.log("loginFacebook ......")
    var confirmPopup = $ionicPopup.confirm({
      title: 'Authorization',
      template: 'Triby would like to access your public profile, location and friend lists.'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log("OK");
      } else {
        console.log("Don't allow");
      }
    });
  };

  $scope.signup = function(){
    $scope.signupData.username = UserService.getUserNameTmp();
    $scope.signupData.country = CountryCodeService.getCountryName($scope.signupData.countryCode);
    UserService.signUpUser($scope.signupData,$cordovaDevice.getUUID()).then(function(response){
      if(response.status == "success")
        $location.path("/confirm");
      else{
        window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
      }
    });
  };

  $scope.step1 = function(){
    $location.path('signup_1');
  };

  $scope.step2 = function(){
    UserService.setUserNameTmp($scope.signupData.username);
    $location.path('signup_2');
  };

  var myPopup;
  $scope.showPopup = function(){
    myPopup = $ionicPopup.show({
      template: '<div class="confirmation_text_box"><div class="confirm_text">Is this your correct number ?</div><div class="check_number"><span class="confirm_code">(' + $scope.signupData.countryCode + ') </span><span class="confirm_no">' + $scope.signupData.phone + '</span></div><div class="instruction_text">An access code will be sent to this number.</div></div><div class="clear"></div>',
      cssClass: 'confirmation_popup',
      scope: $scope,
      buttons: [
        { text: 'Edit' },
        {
          text: '<div class="confirm_number">OK</div>',
          type: 'button-positive',
          onTap: function(e) {
            $scope.signup();
          }
        }
      ]
    });
  };

  function closePop(){
    myPopup.close();
  }
});

MyApp.controller('UserCtrlConfirm', function($scope, $ionicModal, $timeout, $ionicPopup, $location, $window, UserService) {

  $scope.formData = {
    code : ""
  };

  $scope.init = function () {
    $scope.mobilenumber = UserService.getMobileNumber();
  };
  // init method
  $scope.init();

  $scope.confirm = function() {

    UserService.confirmUser($scope.formData.code).then(function(response){

      if(response.status == "success"){
        console.log("$scope.confirm working ....");
        $window.location.href = "#/app/main/home";
      }else{
        window.plugins.toast.showShortCenter(response.message, function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
      }
      });
  }
});
