'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){
    $scope.items = [1,2,3,4];
});

angular.module('app').directive('myTransclude', function(){
    return{
        restrict: 'A',
        transclude: 'element',
        link: function(scope, element, attrs, ctrl, transclude){
            transclude(scope, function(clone){
                element.after(clone);
            });
        }
    };
});