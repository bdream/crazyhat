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
                cls: 'checkboxList',
                itemId: 'checkboxList',
                xtype: 'panel',
                autoDestroy: true
            }
        ]
    },

    initialize : function() {
        this.callParent();
        
        var checkboxList = this.getComponent('checkboxList');
        checkboxList.setItems(this.checkboxes);
        
        var button = new Ext.Button({
            scope: this,
            text: 'Далее',
            docked: 'bottom',
            handler: this.onButtonClick
        });

        this.setItems([
            checkboxList,
            button
        ]);
    },
    
    // Список checkboxes
    checkboxes: [],
    
    setWords: function(words){
        this.checkboxes = [];
        for(var wordIndex in words){
            console.log(words[wordIndex]);
            var currentWord = Ext.create('Ext.field.Checkbox',{
                cls: 'explanationWord',
                label: words[wordIndex],
                checked: true
            });
            
            this.checkboxes.push(currentWord);   
        }
        
        var checkboxList = this.getComponent('checkboxList');
        checkboxList.removeAll(false, false);
        checkboxList.add(this.checkboxes);
    },
    
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
