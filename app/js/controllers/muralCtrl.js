'use strict';
MyApp.controller('MuralCtrl', function($window, $scope, $timeout, $ionicPopup, $location, $cordovaCamera, $ionicModal, $stateParams,
                                       FeedService, UserService, $state, IconService) {

    FeedService.getTriby($stateParams.triby_info).then(function(response){
        response.data.tribe.posts = response.data.tribe.posts.filter(function(post){
            if(post.pic){
                return post ;
            }
        });
        $scope.triby = response.data.tribe;
    });

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
                console.log("get All Currrnt Triby Post :", response.data.post);
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
    };
});

