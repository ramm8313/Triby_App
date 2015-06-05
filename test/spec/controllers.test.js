'use strict';
  
describe('UserCtrl', function(){
    var scope; //we'll use this scope in our tests
  
    // mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('MyApp'));
    beforeEach(angular.mock.module('ngCordovaMocks'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('UserCtrl', {$scope: scope});
    }));
 
    // tests start here
    it('should have variable text = "Hello World!"', function(){
        expect(scope.texto).to.equal('Hllo World!');
    });
});