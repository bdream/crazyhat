/* 
Game preparing screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.EditResultsAfterPlayerTurn", {
    extend: 'Ext.Panel',

    requires: [
    'Ext.Msg',
    'Ext.field.Checkbox',
    'Ext.dataview.List'
    ],

    initialize : function() {
        this.callParent();
        

        var button = new Ext.Button({
            scope: this,
            text: 'Next',
            docked: 'bottom',
            handler: this.onButtonClick
        });

        this.setItems([
            Ext.create('Ext.field.Checkbox',{
                label: 'Картошка',
                checked: true                
            }),
            Ext.create('Ext.field.Checkbox',{
                label: 'Ручка',
                checked: true                
            }),
            Ext.create('Ext.field.Checkbox',{
                label: 'Ложка',
                checked: true                
            }),
            button
            ]);
    },

    onButtonClick: function() {
        this.fireEvent('buttonclick');
    }
});
