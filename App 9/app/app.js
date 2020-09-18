'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){
    $scope.items = [1,2,3,4];
});

angular.module('app').directive('myLazyRender', function(){
    return{
        restrict: 'A',
        transclude: 'element',
        priority: 1200,
        link: function(scope, element, attrs, ctrl, transclude){
            var hasBeenShow = false;
            var unwatchFn = scope.$watch(attrs.myLazyRender, function(value){
                if(value && !hasBeenShow){
                    hasBeenShow = true;
                    transclude(scope, function(clone){
                        element.after(clone);
                    });
                    unwatchFn();
                }
            });
        }
    };
});

angular.module('app').directive('echo', function(){
   return{
       priority: 900,
       link: function (){
           console.log('echo');
       }
   };
});