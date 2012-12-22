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

    isTeamGame : false,
    isRandomTeams : false,
    timeForRound: 30,
    personsCount : 4,
    wordsPerPerson: 5,
    teamsCount: 2,

	config: {
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
                        scope: this,
                        xtype: 'checkboxfield',
                        itemId : 'isTeamGame',
                        label: 'Командная игра',
                        labelWidth: '100%',
                        checked: false,
                        listeners: {
                            check: function(scope){
                                //scope.parent.parent.getComponent('gameConfig').getComponent('isRandomTeams').hide();
                                var gameConfig = scope.parent.parent.getComponent('gameConfig');

                                var isTeamGame = gameConfig.getComponent('isTeamGame');
                                var isRandomTeams = gameConfig.getComponent('isRandomTeams');
                                var timeForRound = gameConfig.getComponent('timeForRound');
                                var personsCount = gameConfig.getComponent('personsCount');
                                var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
                                var teamsCount = gameConfig.getComponent('teamsCount');

                                if(isTeamGame.getChecked()){
                                    isRandomTeams.hide();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else if(isRandomTeams.getChecked()){
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.hide();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else{
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.show();
                                }
                                //scope.parent.parent.onUpdateRecord();

                                scope.parent.parent.isTeamGame = true;                            
                            },
                            uncheck: function(scope){
                                //scope.parent.parent.getComponent('gameConfig').getComponent('isRandomTeams').hide();
                                var gameConfig = scope.parent.parent.getComponent('gameConfig');

                                var isTeamGame = gameConfig.getComponent('isTeamGame');
                                var isRandomTeams = gameConfig.getComponent('isRandomTeams');
                                var timeForRound = gameConfig.getComponent('timeForRound');
                                var personsCount = gameConfig.getComponent('personsCount');
                                var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
                                var teamsCount = gameConfig.getComponent('teamsCount');

                                if(isTeamGame.getChecked()){
                                    isRandomTeams.hide();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else if(isRandomTeams.getChecked()){
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.hide();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else{
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.show();
                                }
                                //scope.parent.parent.onUpdateRecord();

                                scope.parent.parent.isTeamGame = false;    
                            }
                        }
                    },
                    {
                        scope: this,
                        xtype: 'checkboxfield',
                        itemId : 'isRandomTeams',
                        label: 'Случайное распределение по командам',
                        labelWidth: '100%',
                        checked: false,
                        listeners: {
                            check: function(scope){
                                //scope.parent.parent.getComponent('gameConfig').getComponent('isRandomTeams').hide();
                                var gameConfig = scope.parent.parent.getComponent('gameConfig');

                                var isTeamGame = gameConfig.getComponent('isTeamGame');
                                var isRandomTeams = gameConfig.getComponent('isRandomTeams');
                                var timeForRound = gameConfig.getComponent('timeForRound');
                                var personsCount = gameConfig.getComponent('personsCount');
                                var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
                                var teamsCount = gameConfig.getComponent('teamsCount');

                                if(isTeamGame.getChecked()){
                                    isRandomTeams.hide();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else if(isRandomTeams.getChecked()){
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.hide();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else{
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.show();
                                }
                                //scope.parent.parent.onUpdateRecord();
                                                                
                                scope.parent.parent.isRandomTeams = true;    
                            },
                            uncheck: function(scope){
                                //scope.parent.parent.getComponent('gameConfig').getComponent('isRandomTeams').hide();
                                var gameConfig = scope.parent.parent.getComponent('gameConfig');

                                var isTeamGame = gameConfig.getComponent('isTeamGame');
                                var isRandomTeams = gameConfig.getComponent('isRandomTeams');
                                var timeForRound = gameConfig.getComponent('timeForRound');
                                var personsCount = gameConfig.getComponent('personsCount');
                                var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
                                var teamsCount = gameConfig.getComponent('teamsCount');

                                if(isTeamGame.getChecked()){
                                    isRandomTeams.hide();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else if(isRandomTeams.getChecked()){
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.hide();
                                    wordsPerPerson.show();
                                    teamsCount.hide();
                                }
                                else{
                                    isRandomTeams.show();
                                    timeForRound.show();
                                    personsCount.show();
                                    wordsPerPerson.show();
                                    teamsCount.show();
                                }
                                //scope.parent.parent.onUpdateRecord();
                                
                                scope.parent.parent.isRandomTeams = false;  
                            }
                        }
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Время, отведенное на раунд: ',
                        labelWidth: '100%',
                        value: 30,
                        minValue: 1,
                        maxValue: 120,
                        itemId: 'timeForRound',
                        listeners: {
                            change: function(scope){
                                var gameConfig = scope.parent.parent.getComponent('personsCount');
                                var timeForRound = gameConfig.getComponent('timeForRound');
                                
                                scope.parent.parent.timeForRound = timeForRound.getValue();
                            }
                        }
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество людей в игре: ',
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
                        label: 'Количество слов, придумываемых игроком: ',
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
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество команд в игре: ',
                        labelWidth: '100%',
                        value: 2,
                        minValue: 2,
                        maxValue: 15,
                        itemId: 'teamsCount',
                        listeners: {
                            change: function(scope){
                                var gameConfig = scope.parent.parent.getComponent('gameConfig');
                                var teamsCount = gameConfig.getComponent('teamsCount');
                                
                                scope.parent.parent.teamsCount = teamsCount.getValue();
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
				scope: this,
				text: 'Далее',
                                handler: this.onButtonClick
			});

        this.setItems([
			button
		]);

    },
	
    onButtonClick: function() {
        
            //alert(this.teamsCount);
            
            
            var gameSettings = Ext.create('CrazyHat.model.GameSettings', 
                {
                    isTeamGame: this.isTeamGame, 
                    isRandomTeams: this.isRandomTeams, 
                    timeForRound: this.timeForRound, 
                    wordsPerPerson: this.wordsPerPerson, 
                    personsCount: this.personsCount, 
                    teamsCount: this.teamsCount
                });
                    
            this.fireEvent('buttonclick', this.localGameSettings);
    }
});
