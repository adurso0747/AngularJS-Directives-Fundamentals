'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){
    $scope.answers ={baseLocation:"Yavin 4"};
});

angular.module('app').directive('myQuestion', function (){
    return{
        restrict: 'E',
        transclude: true,
        templateUrl: 'myQuestion.html',
        scope:{
            questionText: '@q'
        }
    };
});