'use strict';
MyApp.controller('ChatCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $location, $cordovaCamera, $stateParams, SettingsService, $rootScope, FeedService, $window, CommentsService, SideChatService, UserService, IconService) {
  console.log("Private ChatCtrl start ...");
  console.log("$stateParams :", $stateParams);

  $scope.userID = $stateParams.user_id;
  $scope.post = {type: 'sidechat'};
  console.log("user id :", $scope.post);

  $scope.sidechat = {
    comments: [],
    user: {name: ''}
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
      type: 'sideChatComments',
      id: $scope.sidechat._id,
      comment_id: comment._id
    };
    IconService.setLike(like, $scope.currentUser, comment, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.sideChat();
      });
  };
  ///////////////////  set Like /////////////////////////

  ///////////////////  set Heart /////////////////////////
  $scope.setHeart = function(comment){
    var heart = {
      type: 'sideChatComments',
      id: $scope.sidechat._id,
      comment_id: comment._id
    };
    IconService.setHeart(heart, $scope.currentUser, comment, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.sideChat();
      });
  };
  ///////////////////  set Heart /////////////////////////

  ///////////////////  set DisLike /////////////////////////
  $scope.setDislike = function(comment){
    var dislike = {
      type: 'sideChatComments',
      id: $stateParams.post_id,
      comment_id: comment._id
    };
    IconService.setDislike(dislike, $scope.currentUser, comment, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.sideChat();
      });
  };
  ///////////////////  set DisLike /////////////////////////

  /////////////////// add Comment /////////////////////////
  $scope.addComment = function(form){
    //$scope.submitted = true;
    //if(form.$valid){
      //SideChatService.addComment({user : $scope.post.user}).then(function(data){
      CommentsService.addComment($scope.post).then(function(res){
        console.log("sidechat add comment success :", res);
        $scope.post.comment = '';
        $scope.submitted = false;
        $scope.sidechat = res.data.sidechat;
      }, function(err){
        console.log("sidechat add comment error :", err);
      });
    //}
  };
  /////////////////// add Comment /////////////////////////

  /////////////////// get Comment /////////////////////////
  $scope.sideChat = function(){
    //SideChatService.addComment({user : $scope.post.user}).then(function(data){
    SideChatService.sideChat({user : $scope.userID}).then(function(res){
      console.log("sideChat success :", res);
      $scope.sidechat = res.data.sidechat;
      $scope.post.id = res.data.sidechat._id;
      //$scope.comments = data.data.post.comments;
    }, function(err){
      console.log("sideChat error :", err);
    });
  };
  /////////////////// get Comment /////////////////////////

  $scope.uploadPicture = function(source){

    SettingsService.fileTo($rootScope.urlBackend + '/uploads',"POST",source).then(function(response){

      if(response.status == "success"){
        $scope.post.pic = response.url_file;
        CommentsService.addComment($scope.post).then(function(res){
          console.log("sidechat add comment success :", res);
          $scope.post.comment = '';
          $scope.sidechat = res.data.sidechat;
        }, function(err){
          console.log("sidechat add comment error :", err);
        });
      }
      else
        window.plugins.toast.showShortCenter("Error uploading picture", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    });
  };


  /////////////////// go Side Chat /////////////////////
  $scope.goSideChat = function(id){
    if(id != $scope.currentUser._id)
    {
      $state.go("app.comments_side",{user_id: id});
    }
  };
  /////////////////// go Side Chat /////////////////////
});
