'use strict';

MyApp.service('SideChatService', function ($http, localStorageService, $rootScope) {

  var sideChatServiceFactory = {};

  var _sideChat = function(userID){
    var authData = localStorageService.get('authorizationData');
    $http.defaults.headers.common['Authorization'] = authData.token;

    return $http.post($rootScope.urlBackend + '/sidechat', userID);
  };
  sideChatServiceFactory.sideChat = _sideChat;

  return sideChatServiceFactory;

});
