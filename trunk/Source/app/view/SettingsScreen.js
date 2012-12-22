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
        'CrazyHat.model.GameSettings'
	],

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
                        checked: false
                    },
                    {
                        scope: this,
                        xtype: 'checkboxfield',
                        itemId : 'isRandomTeams',
                        label: 'Случайное распределение по командам',
                        checked: true
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Время, отведенное на раунд: ',
                        minValue: 1,
                        maxValue: 120,
                        itemId: 'timeForRound'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество людей в игре: ',
                        minValue: 4,
                        maxValue: 30,
                        itemId: 'personsCount'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество слов, придумываемых игроком: ',
                        minValue: 1,
                        maxValue: 20,
                        itemId: 'wordsPerPerson'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество команд в игре: ',
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
    
    onUpdateRecord : function(){

        var gameConfig = this.getComponent('gameConfig');

        var isTeamGame = gameConfig.getComponent('isTeamGame');
        var isRandomTeams = gameConfig.getComponent('isRandomTeams');
        var timeForRound = gameConfig.getComponent('timeForRound');
        var personsCount = gameConfig.getComponent('personsCount');
        var wordsPerPerson = gameConfig.getComponent('wordsPerPerson');
        var teamsCount = gameConfig.getComponent('teamsCount');


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
