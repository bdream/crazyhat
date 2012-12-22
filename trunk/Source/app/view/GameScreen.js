﻿/* 
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
		
        var wordsInHat = 5;
        var playerScore = 0;
		
        var playerTurnView = Ext.create('CrazyHat.view.PlayerTurn',{
            listeners: {
                scope: this,
                nextWordButtonClick: function(){
                    if(wordsInHat == 5){
                        // Run timer
                        playerTurnView.runTimer(); 
                    }
                                    
                    if(wordsInHat <= 0){
                        wordsInHat = 5;
                        playerScore = 0;

                        // Set active game preparing screen
                        this.setActiveItem(editResultsAfterPlayerTurnView);
                    }
                    else{
                        wordsInHat--;
                        playerScore++;
                    }

                    playerTurnView.setWordsInHat(wordsInHat);
                    playerTurnView.setPlayerScore(playerScore);   
                },
                timeOut: function(){
                    this.setActiveItem(editResultsAfterPlayerTurnView);
                }
            }
        });
        playerTurnView.setWordsInHat(wordsInHat);
        playerTurnView.setPlayerScore(playerScore);
        playerTurnView.setTimer(0, 15);
		
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
