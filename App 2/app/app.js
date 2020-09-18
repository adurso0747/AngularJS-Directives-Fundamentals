'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope){
  $scope.handlePause = function(e){
    console.log(e);
  };
});

angular.module('app').directive('eventPause', function($parse){
  return{
    restrict: 'A',
    link: function(scope, el, attrs){
      var fn = $parse(attrs['eventPause']);
      el.on('pause', function(event){
        scope.$apply(function(){
          fn(scope, {evt: event, });
        });
      });
    }
  };
});

angular.module('app').directive('spacebarSupport', function(){
  return function(scope, el, attrs){
      $("body").on('keypress', function(evt){
        var vidEl = el[0];
        if(evt.keyCode === 32){
          if(vidEl.paused){
            vidEl.play();
          }
          else{
            vidEl.pause();
          }
        }
      });
    };
});
