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
        items: [
            {
                xtype: 'fieldset',
                title: 'Параметры игры: ',
                items: [
                    {
                        xtype: 'checkboxfield',
                        name : 'isTeamGame',
                        label: 'Командная игра',
                        checked: false
                    },
                    {
                        xtype: 'checkboxfield',
                        name : 'isRandomTeams',
                        label: 'Случайное распределение по командам',
                        checked: true
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Время, отведенное на раунд: ',
                        minValue: 1,
                        maxValue: 120,
                        name: 'timeForRound'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество людей в игре: ',
                        minValue: 4,
                        maxValue: 30,
                        name: 'personsCount'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество слов, придумываемых игроком: ',
                        minValue: 1,
                        maxValue: 20,
                        name: 'wordsPerPerson'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Количество команд в игре: ',
                        minValue: 2,
                        maxValue: 15,
                        name: 'teamsCount'
                    }
                ]
            }
        ]
	},

	initialize : function() {
        this.callParent();

        this.localGameSettings = Ext.create('CrazyHat.model.GameSettings');

        isTeamGame = this.localGameSettings.isTeamGame;
        isRandomTeams = this.localGameSettings.isRandomTeams;
        timeForRound = this.localGameSettings.timeForRound;
        personsCount = this.localGameSettings.personsCount;
        wordsPerPerson = this.localGameSettings.wordsPerPerson;
        teamsCount = this.localGameSettings.teamsCount;

        /*
        isTeamGame.listeners =
        {
            check: this.onUpdateRecord(),
            uncheck: this.onUpdateRecord()
        };
        isRandomTeams.listeners =
        {
            check: this.onUpdateRecord(),
            uncheck: this.onUpdateRecord()
        };
*/

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
        //var isTeamGame = this.getItems('isTeamGame');
        //var isRandomTeams = this.getItems('isRandomTeams');
        //var items = this.getItems('items');
/*
        if(this.isTeamGame == false){
            this.isRandomTeams.hide();
            items.getItem(timeForRound).show();
            items.getItem(personsCount).show();
            items.getItem(wordsPerPerson).show();
            items.getItem(teamsCount).hide();
        }
        else if(this.isRandomTeams == false){
            isRandomTeams.show();
            items.getItem(timeForRound).show();
            items.getItem(personsCount).hide();
            items.getItem(wordsPerPerson).show();
            items.getItem(teamsCount).hide();
        }
        else{
            this.getItems('isRandomTeams').show();
            items.getItem(timeForRound).show();
            items.getItem(personsCount).show();
            items.getItem(wordsPerPerson).show();
            items.getItem(teamsCount).show();
        }
        */
    }
});
