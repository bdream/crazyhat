/* 
Menu screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.MenuScreen", {
    extend: 'Ext.Panel',
    
    requires: [
    'Ext.Msg'
    ],
	
    config: {
        scrollable: {
            direction: 'vertical'
        }
    },
	
    initialize : function() {
        this.callParent();
        
        var rulesLabel = Ext.create('Ext.Label',{
            docked: 'top',
            html: '<b>Правила игры:</b>'
        });
        
        var rules = Ext.create('Ext.Label',{
            html: [
                "Участники игры садятся так, чтобы хорошо видеть и слышать друг друга. " +
                "Приложение выдает по одному слову. " +
                "Активный игрок объясняет своей команде это слово не используя однокоренных. " +
                "За установленное время игрок старается объяснить как можно больше слов. " +
                "Когда время истечет, телефон передают следующему по кругу игроку. " +
                "Игра продолжается, пока все слова не будут отгаданы. " +
                "Далее подсчитываются угаданные слова и набравншая больше всех очков команда побеждает!"
            ]
        });
        
        var button = new Ext.Button({
            scope: this,
            docked: 'bottom',
            text: 'Старт',
            handler: this.onButtonClick
        });
			
        this.setItems([
            rulesLabel,
            rules,
            button
            ]);

    },
	
    onButtonClick: function() {
        this.fireEvent('buttonclick');
    }
});
