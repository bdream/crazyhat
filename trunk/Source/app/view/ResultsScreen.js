/* 
Results screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.ResultsScreen", {
    extend: 'Ext.Panel',
	
    requires: [
    'Ext.Msg'
    ],
	
    config: {
        scrollable: {
            direction: 'vertical'
        },
        
        items: [
            {
                cls: 'gameResultsLabel',
                xtype: 'label',
                docked: 'top',
                html: "Результаты игры"
            },
            {
                cls: 'playerResultList',
                itemId: 'playerResultList',
                xtype: 'panel'
            }
        ]
    },
	
    initialize : function() {
        this.callParent();

        var button = new Ext.Button({
            scope: this,
            text: 'В главное меню',
            docked: 'bottom',
            handler: this.onButtonClick
        });
			
        this.setItems([
            button
            ]);

    },
    
    setResults: function(userResults){
        console.log(userResults);
        
        // Создает данные для отображения статистики игроков
        var playerDataList = [];
        for(var i in userResults){
            var container = Ext.create('Ext.Container', {
                cls: 'userItemContainer',
                items:[
                    // Имя игрока
                    Ext.create('Ext.Label', {
                        cls: 'playerName',
                        html: userResults[i].data.name + ':'
                    }),
                    // Очки игрока
                    Ext.create('Ext.Label', {
                        cls: 'playerScore',
                        html: userResults[i].data.score
                    })
                ]
            });
            
            playerDataList.push(container);
        }
        
        var playerResultList = this.getComponent('playerResultList');
        playerResultList.setItems(playerDataList);
        
        
    },
	
    onButtonClick: function() {
        this.fireEvent('buttonclick');
    }
});
