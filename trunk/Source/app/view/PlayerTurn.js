/* 
Game preparing screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.PlayerTurn", {
	extend: 'Ext.Panel',
	
	requires: [
		'Ext.Msg',
		'Ext.Label'
	],
	
	config: {
		html: 'GameScreen.PlayerTurn'
	},
	
	initialize : function() {
        this.callParent();
		
		var currentWordLabel = new Ext.Label({
			html: 'Current word',
			centered: true
		});
		
		var buttonNextWord = new Ext.Button({
				docked: 'bottom',
				scope: this,
				text: 'Next word',
				handler: this.onNextWordButtonClick
			});
			
        this.setItems([
			currentWordLabel,
			buttonNextWord
		]);

    },
	
	onNextWordButtonClick: function() {
		this.fireEvent('nextWordButtonClick');
	}
});
