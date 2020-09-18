'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', ['ui.bootstrap']);

angular.module('app').controller('mainCtrl', function($scope, personData, droidData){
    $scope.people = personData;
    $scope.droids = droidData;
});

angular.module('app').controller('knightConfirmationCtrl', function($scope, $uibModalInstance, user){
    $scope.user = user;
    $scope.yes = function(){
        $uibModalInstance.close(true);
    };
    $scope.no = function(){
        $uibModalInstance.close(false);
    };
});

angular.module('app').directive('stateDisplay', function(){
   return{
       link: function(scope, element, attrs) {
           var parms = attrs['stateDisplay'].split(' ');
           var linkVar = parms[0];
           var classes= parms.slice(1);

           scope.$watch(linkVar, function(newVal){
               element.removeClass(classes.join(' '));
               element.addClass(parms[newVal +1]);
           });
       }
   };
});

angular.module('app').directive('userPanel', function(){
    return{
        restrict: 'E',
        templateUrl: 'userPanel.html',
        transclude: true,
        scope:{
            name: '@',
            level: '=',
            initialCollapsed: '@collapsed'
        },
        controller: function($scope){
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            $scope.nextState = function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                $scope.level++;
                $scope.level = $scope.level % 4;
            };
            $scope.collapse = function(){
                $scope.collapsed = !$scope.collapsed;
            };
        }
    };
});

angular.module('app').directive('droidInfoCard', function(){
    return{
        templateUrl: 'droidInfoCard.html',
        restrict: "E",
        scope: {
            droid: '=',
            initialCollapsed: '@collapsed'
        },
        require: '^userPanel',
        controller: function($scope){
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            $scope.nextState = function(){
                $scope.droid.level++;
                $scope.droid.level = $scope.droid.level % 4;
            };
            $scope.collapse = function(){
                $scope.collapsed = $scope.collapsed;
            };
        },
    };
});

angular.module('app').factory('jediPolicy', function($q){
    return{
        advanceToKnight: function(candidate){
            var promise = $q(function(resolve, reject){
                if(candidate.hasForce && (candidate.yearsOfJediTraining >20 || candidate.isChosenOne ||
                    (candidate.master === 'Yoda' && candidate.yearsOfJediTraining > 3)) &&
                    candidate.masterApproves && candidate.passedTrials){
                    candidate.rank = "Jedi Knight";
                    resolve(candidate);
                }else{
                    reject(candidate);
                }
            });
            return promise;
        }
    };
});

angular.module('app').directive('personInfoCard', function(jediPolicy){
    return{
        templateUrl: 'personInfoCard.html',
        restrict: "E",
        scope: {
            person: '=',
            initialCollapsed: '@collapsed'
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: function($uibModal){
            var that = this;
            this.collapsed = (this.initialCollapsed === 'true');
            this.knightMe = function(person){
                var modalInstance = $uibModal.open({
                   templateUrl: 'knightConfirmation.html',
                   controller: 'knightConfirmationCtrl',
                   resolve: {
                       user: function(){
                           return that.person;
                       }
                   }
                });

                modalInstance.result.then(function(answer){
                    if(answer){
                        that.person.rank = "Jedi Knight";
                    }
                });
            };

            this.collapse = function(){
                this.collapsed = !this.collapsed;
            };
            this.removeFriend = function(friend){
                var idx = this.person.friends.indexOf(friend);
                if(idx > - 1){
                    this.person.friends.splice(idx,1);
                }
            };
        },
    };
});

angular.module('app').directive('removeFriend', function(){
    return{
        restrict: 'E',
        templateUrl: 'removeFriend.html',
        scope:{
          notifyParent: '&method'
        },
        controller: function($scope){
            $scope.removing = false;
            $scope.startRemove = function(){
                $scope.removing = true;
            };
            $scope.cancelRemove = function(){
                $scope.removing = false;
            };
            $scope.confirmRemove = function(){
                $scope.notifyParent();
            };
        }
    };
});

angular.module('app').directive('address', function(){
    return{
        templateUrl: 'address.html',
        restrict: "E",
        scope: true,
        controller: function ($scope){
            $scope.collapsed = false;
            $scope.expandAddress = function() {
                $scope.collapsed = false;
            };
            $scope.collapseAddress = function(){
                $scope.collapsed = true;
            };
        },
    };
});