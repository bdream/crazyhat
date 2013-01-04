/* 
Settings screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.SettingsScreen", {
    extend: 'Ext.Panel',
    
    requires: [
    'Ext.Msg',
    'Ext.form.Panel',
    'CrazyHat.model.GameSettings',
    'Ext.event.publisher.Dom'
    ],
    scope : this,

    localGameSettings: null,

    timeForRound: 20,
    personsCount : 4,
    wordsPerPerson: 5,

    config: {
        
        scrollable: {
            direction: 'vertical'
        },
        
        scope: this,
        items: [
        {
            id: "gameConfig",
            scope: this,
            itemId : 'gameConfig',
            xtype: 'fieldset',
            title: 'Параметры игры: ',
                
            items: [
            {
                xtype: 'numberfield',
                label: 'Время раунда: ',
                labelWidth: '100%',
                value: 30,
                minValue: 1,
                maxValue: 120,
                itemId: 'timeForRound',
                listeners: {
                    change: function(scope){
                        var gameConfig = scope.parent.parent.getComponent('gameConfig');
                        var timeForRound = gameConfig.getComponent('timeForRound');

                        scope.parent.parent.timeForRound = timeForRound.getValue();
                    }
                }
            },
            {
                xtype: 'numberfield',
                label: 'Людей в игре: ',
                labelWidth: '100%',
                value: 4,
                minValue: 4,
                maxValue: 30,
                itemId: 'personsCount',
                listeners: {
                    change: function(scope){
                        var gameConfig = scope.parent.parent.getComponent('gameConfig');
                        var personsCount = gameConfig.getComponent('personsCount');
                                
                        scope.parent.parent.personsCount = personsCount.getValue();
                    }
                }
            },
            {
                xtype: 'numberfield',
                label: 'Слов игрока: ',
                labelWidth: '100%',
                value: 5,
                minValue: 1,
                maxValue: 20,
                itemId: 'wordsPerPerson',
                listeners: {
                    change: function(scope){
                        var gameConfig = scope.parent.parent.getComponent('gameConfig');
                        var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
                                
                        scope.parent.parent.wordsPerPerson = wordsPerPerson.getValue();
                    }
                }
            }
            ]
        }
        ]
    },

    initialize : function() {
        this.callParent();

        this.localGameSettings = Ext.create('CrazyHat.model.GameSettings');

        

        var button = new Ext.Button({
            docked: 'bottom',
            scope: this,
            text: 'Начать игру',
            handler: this.onButtonClick
        });

        this.setItems([
            button
            ]);

    },
	
    onButtonClick: function() {
        
        //alert(this.teamsCount);
            
            
        var gameSettings = Ext.create('CrazyHat.model.GameSettings', {
            timeForRound: this.timeForRound, 
            wordsPerPerson: this.wordsPerPerson, 
            personsCount: this.personsCount
        });
                    
        this.fireEvent('buttonclick', gameSettings);
    }
});
