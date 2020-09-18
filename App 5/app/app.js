'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){
    $scope.size = 150;
});

angular.module('app').directive('fontScale', function(){
   return{
       link: function (scope, element, attrs){
           scope.$watch(attrs['fontScale'], function(newVal){
              element.css('font-size', newVal + '%');
           });
       }
   };
});