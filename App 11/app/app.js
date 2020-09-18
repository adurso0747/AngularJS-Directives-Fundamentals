'use strict';

// Declare app level module which depends on views, and core components
angular.module('app', []);

angular.module('app').controller('mainCtrl', function ($scope){

});

angular.module('app').directive('emperor', function (){
    var name = 'The Emperor';
    return{
        scope: true,
        controller: function($scope){
            this.name = name;
        },
        link: function($scope, element, attrs) {
                element.data('name', name);
        }
    };
});

angular.module('app').directive('vader', function (){
    var name = 'Vader'
    return{
        scope: true,
        require: '^emperor',
        controller: function($scope){
            this.name = name;
        },
        link:function($scope, element, attrs, emperorCtrl){
                element.data('name', name);
                element.data('master', emperorCtrl.name);
                console.log('Vader\'s master is ' + emperorCtrl.name);
        }
    };
});

angular.module('app').directive('starkiller', function (){
    return{
        scope: true,
        require: ['?^vader', '^emperor'],
        link: function($scope, element, attrs, ctrls) {
            element.data('name', 'Starkiller');
            if (!!ctrls[0]) {
                element.data('master', ctrls[0].name);
                console.log('Starkiller\'s master is ' + ctrls[0].name);
                console.log('Starkiller\'s master\'s master is ' + ctrls[1].name);
            } else {
                console.log('Starkiller doesn\'t have a master');
            }
        }
    };
});