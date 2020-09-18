'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){
    $scope.bountyHunters = [{
        name: 'Boba Fett', age: 35
    }, {
        name: 'IG-88', age: 130
    },{
        name: 'Dengar', age: 42
    }, {
        name: 'Bossk', age: 782
    },{
        name: 'Cad Bane', age: 51
    }];

    $scope.add = function() {
        $scope.bountyHunters.push({name: '4LOM'});
    };
    $scope.remove = function(){
        $scope.bountyHunters.length--;
    };

});

angular.module('app').directive('userList', function($compile){
    return{
        restrict: 'A',
        transclude: 'element',
        link: function(scope, element, attrs, ctrl, transclude){
            var pieces = attrs.userList.split(' ');
            var itemString = pieces[0];
            var collectionName = pieces[2];
            var elements = [];

            scope.$watchCollection(collectionName, function(collection){
                if(elements.length > 0){
                    for(var i=0; i < elements.length; i++){
                        elements[i].element.remove();
                        elements[i].scope.$destroy();
                    }
                    elements = [];
                }
               for(var i= 0; i < collection.length; i++){
                   var childScope = scope.$new();
                   childScope[itemString] = collection[i];
                   transclude(childScope, function(clone){
                       var template = $compile('<div class="card" style="background-color: dimgrey; color: white" >' +
                           '<div class="card-header" style="background-color: grey">{{' + itemString + '.name}}</div><div class="card-body" /></div>');
                       var wrapper = template(childScope);
                       wrapper.find(".card-body").append(clone);
                       element.before(wrapper);
                       var item = {};
                       item.el = wrapper;
                       item.scope = childScope;
                       elements.push(item);
                   });
               }
            });
        }
    };
});