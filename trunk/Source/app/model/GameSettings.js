Ext.define('CrazyHat.model.GameSettings', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'isTeamGame',  type: 'bool', defaultValue: false},
            {name: 'isRandomTeams',   type: 'bool', defaultValue: true},
            {name: 'timeForRound', type: 'int', defaultValue: 30},
            {name: 'wordsPerPerson', type: 'int', defaultValue: 5},
            {name: 'personsCount', type: 'int', defaultValue: 4},
            {name: 'teamsCount', type: 'int',defaultValue: 2}
        ]
    }

});