'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){
    $scope.message = "This is a message";
    console.log('controller', $scope);
});

angular.module('app').controller('innerCtrl', function($scope){
    console.log('inner controller', $scope);
});

angular.module('app').directive('displayBox', function(){
   return{
       restrict: 'E',
       templateUrl: 'displayBox.html',
       scope: true,
       transclude: true,
       controller: function($scope){
            $scope.hidden = false;
            $scope.close = function(){
                $scope.hidden = true;
            };
            $scope.message= "Hijacked scope";
            console.log('directive', $scope);
       }
   };
});