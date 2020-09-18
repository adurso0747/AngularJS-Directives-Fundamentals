'use strict';

angular.module('app').factory('personData', function(){
    var people = [
        {
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
        },

        {
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
        }
    ];
    return people;
});
