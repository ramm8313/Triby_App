'use strict';

MyApp.factory('UserService', function($q, $rootScope, $http, localStorageService, $ionicLoading) {
  
  var userServiceFactory = {};

  var _signUpUser = function (signupData,deviceId) {

  		var deferred = $q.defer();
        var data = {
                        username:signupData.username,
                        mobilenumber:signupData.countryCode + signupData.phone,
                        device_id: deviceId,
                        country: signupData.country,
                        password:"demo" // hardcode right now
                    };

        $http.post($rootScope.urlBackend + '/user', data).success(function (response) {
          if(response.user){
            localStorageService.set('authorizationData', { username: response.user.username, mobilenumber: response.user.mobilenumber, isAuth:false });
          }
          deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
	};

  var _tmpUserName = "";
  var _setUserNameTmp = function(aUserName) {
    _tmpUserName = aUserName;
  };
  var _getUserNameTmp = function() {
    return _tmpUserName;
  };

  var _getMobileNumber = function () {
    var authData = localStorageService.get('authorizationData');
    return authData.mobilenumber;
  };
    var _getAuthData = function () {
    var authData = localStorageService.get('authorizationData');
    return authData;
  };

  var _confirmUser = function (aCode) {

      var deferred = $q.defer();
      var authData = localStorageService.get('authorizationData');
      var data = {
                      username:authData.username,
                      mobilenumber:authData.mobilenumber,
                      code:aCode 
                  };

        $http.post($rootScope.urlBackend + '/user/confirm', data).success(function (response) {
          if(response.status == "success"){
            $http.post($rootScope.urlBackend + '/user/login', data).success(function (response) {
              console.log(response);
              localStorageService.set('authorizationData', { username: data.username, mobilenumber: data.mobilenumber, token:response.token, isAuth:true, type: 'mobile' });
              deferred.resolve(response);
            });
          }
          else
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
  };

  var _isAuthorized = function () {
    var authData = localStorageService.get('authorizationData');
    if(!authData)
      return false;
    else
      return authData.isAuth;
  };

  var _loginUser = function () {
    var deferred = $q.defer();
    var authData = localStorageService.get('authorizationData');
    var data = {
                    username:authData.username,
                    mobilenumber:authData.mobilenumber
                };

      $http.post($rootScope.urlBackend + '/user/login', data).success(function (response) {
        deferred.resolve(response);
      }).error(function (err, status) {
          deferred.reject(err);
      });

      return deferred.promise;
  };

  var _loginUserFacebook = function (userData) {
    var deferred = $q.defer();
    
    $http.post($rootScope.urlBackend + '/user/facebook', userData).success(function (response) {
      if(response.status == "success"){
        localStorageService.set('authorizationData', { username: response.user.username, mobilenumber: response.user.mobilenumber, token:response.token, isAuth:true, type: 'facebook' });
      }
      deferred.resolve(response);
    }).error(function (err, status) {
        deferred.reject(err);
    });

    return deferred.promise;
  }

  var _getUser = function(aUserName){
    var authData = localStorageService.get('authorizationData');
    $http.defaults.headers.common['Authorization'] = authData.token;
    if(!aUserName)
      aUserName = authData.username;
    return $http.get($rootScope.urlBackend + '/user/' + aUserName);
  }

	userServiceFactory.signUpUser = _signUpUser;
  userServiceFactory.getMobileNumber = _getMobileNumber;
  userServiceFactory.getAuthData = _getAuthData;
  userServiceFactory.confirmUser = _confirmUser;
  userServiceFactory.isAuthorized = _isAuthorized;
  userServiceFactory.loginUser = _loginUser;
  userServiceFactory.loginUserFacebook = _loginUserFacebook;
  userServiceFactory.getUser = _getUser; 
  userServiceFactory.getUserNameTmp = _getUserNameTmp;
  userServiceFactory.setUserNameTmp = _setUserNameTmp;
	
  return userServiceFactory;
})