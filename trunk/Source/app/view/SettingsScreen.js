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
    isRandomTeams : true,
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
                            }
                        }
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Время, отведенное на раунд: ',
                        labelWidth: '100%',
                        minValue: 1,
                        maxValue: 120,
                        itemId: 'timeForRound'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество людей в игре: ',
                        labelWidth: '100%',
                        minValue: 4,
                        maxValue: 30,
                        itemId: 'personsCount'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество слов, придумываемых игроком: ',
                        labelWidth: '100%',
                        minValue: 1,
                        maxValue: 20,
                        itemId: 'wordsPerPerson'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество команд в игре: ',
                        labelWidth: '100%',
                        minValue: 2,
                        maxValue: 15,
                        itemId: 'teamsCount'
                    }
                ]
            }
        ]
	},

	initialize : function() {
        this.callParent();

        this.localGameSettings = Ext.create('CrazyHat.model.GameSettings');
/*
        isTeamGame = this.localGameSettings.isTeamGame;
        isRandomTeams = this.localGameSettings.isRandomTeams;
        timeForRound = this.localGameSettings.timeForRound;
        personsCount = this.localGameSettings.personsCount;
        wordsPerPerson = this.localGameSettings.wordsPerPerson;
        teamsCount = this.localGameSettings.teamsCount;
*/

        var gameConfig = this.getComponent('gameConfig');

        var isTeamGame = gameConfig.getComponent('isTeamGame');
        var isRandomTeams = gameConfig.getComponent('isRandomTeams');

        isTeamGame.listeners =
        {
            scope: this,
            check: this.onUpdateRecord
        };
        isRandomTeams.listeners =
        {
            scope: this,
            check: this.onUpdateRecord
        };

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
            this.fireEvent('buttonclick', this.localGameSettings);
    },
    
    onUpdateRecord : function(gameConfig){

        var isTeamGame = gameConfig.getComponent('isTeamGame');
        var isRandomTeams = gameConfig.getComponent('isRandomTeams');
        var timeForRound = gameConfig.getComponent('timeForRound');
        var personsCount = gameConfig.getComponent('personsCount');
        var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
        var teamsCount = gameConfig.getComponent('teamsCount');

        alert(isTeamGame.checked);

        if(isTeamGame.checked == false){
            alert("asd");
            isRandomTeams.hide();
            timeForRound.show();
            personsCount.show();
            wordsPerPerson.show();
            teamsCount.hide();
        }
        else if(isRandomTeams.checked == false){
            alert("asd");
            isRandomTeams.show();
            timeForRound.show();
            personsCount.hide();
            wordsPerPerson.show();
            teamsCount.hide();
        }
        else{
            alert("asd");
            isRandomTeams.show();
            timeForRound.show();
            personsCount.show();
            wordsPerPerson.show();
            teamsCount.show();
        }

    }
});
