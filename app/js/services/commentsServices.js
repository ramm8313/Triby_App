'use strict';

MyApp.service('CommentsService', function ($http, localStorageService, $rootScope) {

  var commentsServiceFactory = {};

  var _addComment = function(commentObj){
    var authData = localStorageService.get('authorizationData');
    $http.defaults.headers.common['Authorization'] = authData.token;

    return $http.post($rootScope.urlBackend + '/comments', commentObj);
  };

  commentsServiceFactory.addComment = _addComment;

  return commentsServiceFactory;

});
