'use strict';

angular.module('app').factory('droidData', function(){
    var droids = [
        {
            name: 'R2-D2',
            specifications:{
                manufacturer: 'Industrial Automaton',
                type: 'Astromech',
                productLine: 'R2 series'
            },
            level: 1
        },

        {
            name: 'C-3P0',
            specifications:{
                manufacturer: 'Cybot Galactica',
                type: 'Protocol Droid',
                productLine: '3P0-series'
            },
            level: 1
        }
    ];
    return droids;
});