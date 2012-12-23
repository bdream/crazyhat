/* 
Main screen of Application
Contains all other Application's screens and change screens logic
*/

Ext.define("CrazyHat.view.MainScreen", {
    extend: 'Ext.Panel',
	
    config: {
        fullscreen: true,
        layout: {
            type: 'card'
        }
    },

    gameSettings:null, // игровые настройки
	
    initialize: function(){
        this.callParent();

        this.gameSettings = Ext.create('CrazyHat.model.GameSettings');
		
        var settingsScreen = Ext.create('CrazyHat.view.SettingsScreen', {
            listeners: {
                scope: this,
                buttonclick: this.onAcceptSettingsClick
            }
        });
		
        var menuScreen = Ext.create('CrazyHat.view.MenuScreen', {
            listeners: {
                scope: this,
                buttonclick: function(){
                    // Set active game preparing screen
                    this.setActiveItem(settingsScreen);
                }
            }
        });
		
        this.setItems([
            menuScreen
            ]);
    },
    
    // Обработывает событие подтверждения настроек игры
    onAcceptSettingsClick: function(localGameSettings){

        // применяем настройки, введенные на вьюшке SettingsScreen
        this.gameSettings = localGameSettings;

        var gameScreen = Ext.create('CrazyHat.view.GameScreen', {
            listeners: {
                scope: this,
                gameEnded: this.onGameEnded
            }
        });
        
        gameScreen.setGameSettings(localGameSettings.data);
        
        // Set active game screen
        this.setActiveItem(gameScreen);
        
        // Запускает игру
        gameScreen.startGame();
    },
    
    // Обрабатывает событие завершения игры
    onGameEnded: function(gameResults){
        console.log(gameResults);
        
        var resultsScreen = Ext.create('CrazyHat.view.ResultsScreen', {
            listeners: {
                scope: this,
                buttonclick: function(){
                    // Set active game preparing screen
                    // this.setActiveItem(menuScreen);
                }
            }
        });
        
        // Устанавливает результаты игры для отображения на экране
        resultsScreen.setResults(gameResults);
        
        // Set active game results screen
        this.setActiveItem(resultsScreen);
    }
});
