'use strict';
MyApp.controller('FeedCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal, $timeout, $ionicPopup, $location, $cordovaCamera, $stateParams, SettingsService, $rootScope,
                                      triby, FeedService, $window, $state, UserService, IconService, $ionicLoading) {

  $scope.posts = [];
  $scope.triby = triby.data.tribe;
    $scope.title = '<a href="#/app/info/' + $stateParams.triby_id + '">' + $scope.triby.name + '</a>';
	$scope.post = {
		message: "",
		image: "",
		triby: $stateParams.triby_id
	};
  $scope.updateEditor = function() {
    var element = document.getElementById("page_content");
    element.style.height = element.scrollHeight + "px";
};
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

    $ionicModal.fromTemplateUrl('templates/mural_details.html', function(modal) {
            $scope.gridModal = modal;
        },
        {
            scope: $scope
        });

    $scope.openModal = function(selected) {
        $scope.post = selected;
        $scope.gridModal.show();

        $scope.goComment = function(post){
            $scope.gridModal.hide();
            $state.go("app.comments",{post_id: post._id});
        };
        /////////////////// go Side Chat /////////////////////
        $scope.goSideChat = function(id){
            if(id != $scope.currentUser._id)
            {
                $scope.gridModal.hide();
                $state.go("app.comments_side",{user_id: id});
            }
        };
        /////////////////// go Side Chat /////////////////////

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

        /////////////////// get All Currrnt Triby Post /////////////////////////
        $scope.getPost = function(){
            FeedService.getPosts($scope.post._id).then(function(response){
                $scope.post = response.data.post;
            });
        };
        /////////////////// get All Currrnt Triby Post /////////////////////////

        ///////////////////  set Like /////////////////////////
        $scope.setLike = function(post){
            var like = {
                type: 'post',
                id: post._id
            };
            IconService.setLike(like, $scope.currentUser, post, function(err, post){
                if(err) console.log("like error :", err);
                if(post) $scope.getPost();
            });
        };
        ///////////////////  set Like /////////////////////////

        ///////////////////  set Heart /////////////////////////
        $scope.setHeart = function(post){
            var heart = {
                type: 'post',
                id: post._id
            };
            IconService.setHeart(heart, $scope.currentUser, post, function(err, post){
                if(err) console.log("like error :", err);
                if(post) $scope.getPost();
            });
        };
        ///////////////////  set Heart /////////////////////////

        ///////////////////  set DisLike /////////////////////////
        $scope.setDislike = function(post){
            var dislike = {
                type: 'post',
                id: post._id
            };
            IconService.setDislike(dislike, $scope.currentUser, post, function(err, post){
                if(err) console.log("like error :", err);
                if(post) $scope.getPost();
            });
        };
        ///////////////////  set DisLike /////////////////////////
    };

    $scope.closeModal = function() {
        $scope.gridModal.hide();
        $scope.getAllPostInCtrl();
    };
  /////////////////// go Side Chat /////////////////////
  $scope.goSideChat = function(id){
    if(id != $scope.currentUser._id)
    {
      $state.go("app.comments_side",{user_id: id});
    }
  };
  /////////////////// go Side Chat /////////////////////

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

  /////////////////// get All Currrnt Triby Post /////////////////////////
  $scope.getAllPostInCtrl = function(){
    FeedService.getTriby($stateParams.triby_id).then(function(response){
      console.log("get All Currrnt Triby Post :", response.data.tribe.posts);
      $scope.triby = response.data.tribe;
    });
  };
  /////////////////// get All Currrnt Triby Post /////////////////////////

  ///////////////////  set Like /////////////////////////
  $scope.setLike = function(post){
    var like = {
      type: 'post',
      id: post._id
    };
    IconService.setLike(like, $scope.currentUser, post, function(err, data){
        if(err) console.log("like error :", err);
        if(data) $scope.getAllPostInCtrl();
    });
  };
  ///////////////////  set Like /////////////////////////

  ///////////////////  set Heart /////////////////////////
  $scope.setHeart = function(post){
    var heart = {
      type: 'post',
      id: post._id
    };
    IconService.setHeart(heart, $scope.currentUser, post, function(err, data){
          if(err) console.log("like error :", err);
          if(data) $scope.getAllPostInCtrl();
      });
  };
  ///////////////////  set Heart /////////////////////////

  ///////////////////  set DisLike /////////////////////////
  $scope.setDislike = function(post){
        var dislike = {
            type: 'post',
            id: post._id
        };
        IconService.setDislike(dislike, $scope.currentUser, post, function(err, data){
            if(err) console.log("like error :", err);
            if(data) $scope.getAllPostInCtrl();
        });
    };
  ///////////////////  set DisLike /////////////////////////

  /////////////////// send Post /////////////////////////
    $scope.send = true;
	$scope.sendPost = function(){
      if($scope.send){
        $scope.send = false;
        FeedService.savePost($scope.post).then(function(response){
            console.log("$scope.sendPost :", response.tribe);
            $scope.getAllPostInCtrl();
            $scope.send = true;
            $scope.post.message = "";

        });
    }
	};
  /////////////////// send Post /////////////////////////

  /////////////////// upload Picture /////////////////////////
	$scope.uploadPicture = function(source){
		SettingsService.fileTo($rootScope.urlBackend + '/uploads', "POST", source).then(function(response){
            $ionicLoading.show({
                template: 'Saving...'
            });
			if(response.status == "success"){
				$scope.post.image = response.url_file;
				FeedService.savePost($scope.post).then(function(response){
					console.log("News-feed uploadPicture :", response);
          $scope.getAllPostInCtrl();
          $scope.post.message = "";
                    $ionicLoading.hide();
				});
			}
			else
				window.plugins.toast.showShortCenter("Error uploading picture", function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
		});
	};
  /////////////////// upload Picture /////////////////////////
});
