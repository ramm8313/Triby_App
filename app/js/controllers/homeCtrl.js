'use strict';
MyApp.controller('HomeCtrl', function($scope, $location, tribes) {

  $scope.tribes = {};
  $scope.hideEmptyTribes = tribes.data.tribes.length > 0;
  $scope.tribes = chunk(tribes.data.tribes, 2);

  function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }
});
