/* 
Game screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.GameScreen", {
	extend: 'Ext.Panel',
	
	requires: [
		'Ext.Msg'
	],
		
	config: {
		layout: {
			type: 'card'
		}
	},
	
	initialize : function() {
        this.callParent();
		
		var editResultsAfterPlayerTurnView = Ext.create('CrazyHat.view.EditResultsAfterPlayerTurn',{
			listeners: {
				scope: this,
				buttonclick: function(){
					// Set active game preparing screen
					this.setActiveItem(playerTurnView);
				}
			}
		});
		
		var playerTurnView = Ext.create('CrazyHat.view.PlayerTurn',{
			listeners: {
				scope: this,
				nextWordButtonClick: function(){
					// Set active game preparing screen
					this.setActiveItem(editResultsAfterPlayerTurnView);
				}
			}
		});
		
		// Button to debug
		var button = new Ext.Button({
				docked: 'bottom',
				scope: this,
				text: 'Go to results',
				handler: this.onButtonClick
			});
			
        this.setItems([
			playerTurnView,
			button
		]);

    },
	
	onButtonClick: function() {
		this.fireEvent('buttonclick');
	}
});
