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
	
	initialize: function(){
		this.callParent();

		var resultsScreen = Ext.create('CrazyHat.view.ResultsScreen', {
			listeners: {
				scope: this,
				buttonclick: function(){
					// Set active game preparing screen
					this.setActiveItem(menuScreen);
				}
			}
		});

		var gameScreen = Ext.create('CrazyHat.view.GameScreen', {
			listeners: {
				scope: this,
				buttonclick: function(){
					// Set active game preparing screen
					this.setActiveItem(resultsScreen);
				}
			}
		});
		
/*
		var gamePreparingScreen = Ext.create('CrazyHat.view.GameScreen.GamePreparingScreen', {
			listeners: {
				scope: this,
				buttonclick: function(){
					// Set active game preparing screen
					this.setActiveItem(gameScreen);
				}
			}
		});
*/
		
		var settingsScreen = Ext.create('CrazyHat.view.SettingsScreen', {
			listeners: {
				scope: this,
				buttonclick: function(){
					// Set active game preparing screen
					this.setActiveItem(gameScreen);
				}
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
	}
});
