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
		html: 'GameScreen',
	},
	
	initialize : function() {
        this.callParent();

		var button = new Ext.Button({
				scope: this,
				text: 'Button',
				handler: this.onButtonClick
			});
			
        this.setItems([
			button
		]);

    },
	
	onButtonClick: function() {
		this.fireEvent('buttonclick');
	}
});
