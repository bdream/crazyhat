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
    
    config:{
        items:[
            {
                itemId: 'checkboxList',
                xtype: 'panel'
            }
        ]
    },

    initialize : function() {
        this.callParent();
        
        var checkboxList = this.getComponent('checkboxList');
        checkboxList.setItems(this.checkboxes);
        
        var button = new Ext.Button({
            scope: this,
            text: 'Next',
            docked: 'bottom',
            handler: this.onButtonClick
        });

        this.setItems([
            checkboxList,
            button
        ]);
    },
    
    // Список checkboxes
    checkboxes: [
        new Ext.create('Ext.field.Checkbox',{
            cls: 'explanationWord',
            label: 'Картошка',
            checked: true
        }),
        new Ext.create('Ext.field.Checkbox',{
            cls: 'explanationWord',
            label: 'Ложка',
            checked: true
        }),
        new Ext.create('Ext.field.Checkbox',{
            cls: 'explanationWord',
            label: 'Ручка',
            checked: true
        })
    ],
    
    // Возвращает количество выделенных элементов
    // (количество правильно объясненных слов)
    getCountCheckedWords: function(){
        var explanationWords = this.checkboxes;

        var countChecked = 0;
        for(var index in explanationWords){
            if(explanationWords[index].getChecked()){
                countChecked++;
            }
        }
    
        return countChecked;
    },

    onButtonClick: function() {
        this.fireEvent('buttonclick');
    }
});
