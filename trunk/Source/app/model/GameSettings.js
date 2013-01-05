Ext.define('CrazyHat.model.GameSettings', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'timeForRound', type: 'int', defaultValue: 20},  // Time for one game round
            {name: 'personsCount', type: 'int', defaultValue: 4},   // Players count
            {name: 'wordsPerPerson', type: 'int', defaultValue: 5}  // Words per person
        ]
    }
});