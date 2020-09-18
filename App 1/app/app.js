'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope){
    $scope.person1 = {
        name: 'Luke Skywalker',
        address:{
            street: 'PO Box 123',
            city: 'Secret Rebel Base',
            planet:'Yavin 4'
        },
        friends: [
            'Han',
            'Leia',
            'Chewbacca'
        ],
        level: 1,
        hasForce: true,
        yearsOfJediTraining: 4,
        master: 'Yoda',
        passedTrials: true,
        masterApproves: true
    };

    $scope.person2 = {
        name: 'Han Solo',
        address:{
            street: 'PO Box 123',
            city: 'Mos Eisley',
            planet:'Tattooine'
        },
        friends: [
            'Luke',
            'Leia',
            'Chewbacca'
        ],
        level: 0
    };
    $scope.droid1 = {
        name: 'R2-D2',
        specifications:{
            manufacturer: 'Industrial Automaton',
            type: 'Astromech',
            productLine: 'R2 series'
        },
        level: 1
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
        controller: function($scope){

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
        controller: function(){
            this.collapsed = (this.initialCollapsed === 'true');
            this.knightMe = function(){
                this.showKnightModal = true;
            };

            this.knightDialogDone = function(response, person){
                this.showKnightModal = false;
                if(response){
                    jediPolicy.advanceToKnight(person).then(null, function (person){
                        alert('Sorry, ' + person.name + ' is not ready to become a Jedi Knight');
                    });
                }
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

angular.module('app').directive('modal', function ($document){
    return{
        scope:{
            modalOpen: '=open',
            options: '=',
            onClose: '&'
        },
        transclude: true,
        templateUrl: 'modal.html',
        controller: function($scope){
            $scope.close = function(){
                $scope.modalOpen = false;
                $scope.onClose();
            };
        },
        link: function($scope, element, attrs){
            var options = angular.extend({
                height: '250px',
                width: '500px',
                top: '20%',
                left: '30%'
            }, $scope.options);

            element.find('.modal-container').css({
                'left' :options.left,
                'top' :options.top,
                'height': options.height + 'px'
            });

            var pageHeight = $document.height();
            var pageWidth = $document.width();
            element.find('.modal-blackout').css({
                'width': pageWidth + 'px',
                'height': pageHeight + 'px'
            });

        }
    };
});