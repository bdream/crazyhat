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
    'Ext.event.publisher.Dom',
    'Ext.form.FieldSet',
    'Ext.field.Number'
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
                id: 'timeForRound',
                xtype: 'numberfield',
                label: 'Время раунда: ',
                labelWidth: '100%',
                value: 20,
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
                id: 'personsCount',
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
                id: 'wordsPerPerson',
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
    
    // Checking validation
    isValid: function() {
        var fieldsArray = [
            document.getElementById('timeForRound'),
            document.getElementById('wordsPerPerson'),
            document.getElementById('personsCount')
        ]
        
        for(var i in fieldsArray){
            // if anyone isn't valid return false
            if(!checkNumberFieldValidity(fieldsArray[i]))
                return false;
        }
        
        return true;
    },
	
    onButtonClick: function() {
        try
        {
            var timeForRound = Ext.getCmp('timeForRound');        
            if(!checkNumberFieldValidityAndFix(timeForRound)){
                var message =
                    "Укажите время раунда от "
                    + timeForRound.getMinValue()
                    + " до "
                    + timeForRound.getMaxValue()
                    + " секунд";
                throw new Error(message);
            }
            
            var personsCount = Ext.getCmp('personsCount');
            if(!checkNumberFieldValidityAndFix(personsCount)){
                var message = 
                    "Укажите число игроков от "
                    + personsCount.getMinValue()
                    + " до "
                    + personsCount.getMaxValue();
                throw new Error(message);
            }
            
            var wordsPerPerson = Ext.getCmp('wordsPerPerson');
            if(!checkNumberFieldValidityAndFix(wordsPerPerson)){
                var message = 
                    "Укажите количество слов на человека от "
                    + wordsPerPerson.getMinValue()
                    + " до "
                    + wordsPerPerson.getMaxValue();
                throw new Error(message);
            }

            var gameSettings = Ext.create('CrazyHat.model.GameSettings', {
                timeForRound: this.timeForRound, 
                wordsPerPerson: this.wordsPerPerson, 
                personsCount: this.personsCount
            });

            this.fireEvent('buttonclick', gameSettings);
        }
        catch(error)
        {
            Ext.Msg.alert('Ошибка ввода', error.message);
        }
    }
});

function checkNumberFieldValidityAndFix(numberField){
    var minValue = numberField.getMinValue();
    var maxValue = numberField.getMaxValue();
    var value = numberField.getValue();
    
    if(typeof value != 'number'){
        numberField.setValue(minValue);
        return false;
    }
    
    if(minValue <= value && value <= maxValue)
        return true;
    
    if(minValue > value)
        numberField.setValue(minValue);
    
    if(maxValue < value)
        numberField.setValue(maxValue);
    
    return false;
}
