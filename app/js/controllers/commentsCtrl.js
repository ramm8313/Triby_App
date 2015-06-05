'use strict';
MyApp.controller('CommentsCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, $cordovaCamera, $stateParams, SettingsService, $rootScope, CommentsService, FeedService,
                                          UserService, $window, $state, IconService) {

  $scope.post = {type: 'post', id: $stateParams.post_id};
  $scope.triby = {
    id: $stateParams.post_id
  };

  /////////////////// get Current User /////////////////////
  UserService.getUser().then(function(data){
    console.log("get user .... :", data);
    $scope.currentUser = data.data.user;
  });
  /////////////////// get Current User /////////////////////

  /////////////////// icon Filter /////////////////////////
  $scope.iconFilter = function(array){
      return IconService.iconFilter($scope.currentUser, array);
  };
  /////////////////// icon Filter /////////////////////////

  ///////////////////  set Like /////////////////////////
  $scope.setLike = function(comment){
    var like = {
      type: 'postComments',
      id: $stateParams.post_id,
      comment_id: comment._id
    };
      IconService.setLike(like, $scope.currentUser, comment, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.getComments();
      });
  };
  ///////////////////  set Like /////////////////////////

  ///////////////////  set Heart /////////////////////////
  $scope.setHeart = function(comment){
    var heart = {
      type: 'postComments',
      id: $stateParams.post_id,
      comment_id: comment._id
    };
    IconService.setHeart(heart, $scope.currentUser, comment, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.getComments();
      });
  };
  ///////////////////  set Heart /////////////////////////

  ///////////////////  set DisLike /////////////////////////
  $scope.setDislike = function(comment){
    var dislike = {
      type: 'postComments',
      id: $stateParams.post_id,
      comment_id: comment._id
    };
    IconService.setDislike(dislike, $scope.currentUser, comment, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.getComments();
      });
  };
  ///////////////////  set DisLike /////////////////////////

  /////////////////// add Comment /////////////////////////
  $scope.addComment = function(){
    //if(form.$valid){
      CommentsService.addComment($scope.post).then(function(data){
        console.log("comment success :", data);
        $scope.post.comment = '';
        $scope.submitted = false;
        $scope.comments = data.data.post.comments;
      }, function(err){
        console.log("comment error :", err);
      });
    //}
  };
  /////////////////// add Comment /////////////////////////

  /////////////////// get Comment /////////////////////////
  $scope.getComments = function(){
    FeedService.getPosts($stateParams.post_id).then(function(data){
      console.log("comment success :", data);
      $scope.comments = data.data.post.comments;
    }, function(err){
      console.log("comment error :", err);
    });
  };
  /////////////////// get Comment /////////////////////////

  /////////////////// upload Picture /////////////////////////
  $scope.uploadPicture = function(source){

    SettingsService.fileTo($rootScope.urlBackend + '/uploads', "POST", source).then(function(response){

      if(response.status == "success"){
        $scope.post.pic = response.url_file;
        CommentsService.addComment($scope.post).then(function(data){
          console.log("comment success :", data);
          $scope.post.comment = '';
          $scope.comments = data.data.post.comments;
        }, function(err){
          console.log("comment error :", err);
        });
      }
      else
        window.plugins.toast.showShortCenter("Error uploading picture", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    });
  };
  /////////////////// upload Picture /////////////////////////

  /////////////////// go Side Chat /////////////////////
  $scope.goSideChat = function(id){
    if(id != $scope.currentUser._id)
    {
      $state.go("app.comments_side",{user_id: id});
    }
  };
  /////////////////// go Side Chat /////////////////////
});
