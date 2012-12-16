/* 
Game preparing screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.PlayerTurn", {
	extend: 'Ext.Panel',
	
	requires: [
		'Ext.Msg'
	],
	
	config: {
		html: 'GameScreen.PlayerTurn',
	},
	
	initialize : function() {
        this.callParent();

		var buttonNextWord = new Ext.Button({
				
				scope: this,
				text: 'Next word',
				handler: this.onNextWordButtonClick
			});
			
        this.setItems([
			buttonNextWord
		]);

    },
	
	onNextWordButtonClick: function() {
		this.fireEvent('nextWordButtonClick');
	}
});
