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
        
        // Создает хранилице слов
        var wordsStore = Ext.create('CrazyHat.model.WordsStore');
        
        var editResultsAfterPlayerTurnView = Ext.create('CrazyHat.view.EditResultsAfterPlayerTurn',{
            listeners: {
                scope: this,
                buttonclick: function(){
                    // Получает количество правильно объясненных слов
                    var correctExplanationWords = editResultsAfterPlayerTurnView.getCountCheckedWords();
                    alert(correctExplanationWords);
                    
                    // Set active game preparing screen
                    this.setActiveItem(playerTurnView);
                }
            }
        });
        
        var wordsInHat = wordsStore.getWordsCount();
        var playerScore = 0;
		
        var playerTurnView = Ext.create('CrazyHat.view.PlayerTurn',{
            listeners: {
                scope: this,
                nextWordButtonClick: function(){
                    if(wordsInHat == 13){
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
                    
                    // Берет из хранилища очередное слово и показывает его
                    var currentWord = wordsStore.popRandomWord();
                    playerTurnView.setCurrentWord(currentWord);
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
            handler: this.onGameEnded
        });
			
        this.setItems([
            playerTurnView,
            button
            ]);
    },
    
    users: [],
    
    // Устанавливает настройки игры
    setGameSettings: function(settings){
        // Получает количество пользователей
        console.log(settings.personsCount);
        var countUsers = settings.personsCount;
        
        // Создает пользователей для игры
        var users = [];
        for(var i = 0; i <= countUsers; i++){
            console.log('Игрок № ' + (i+1));
            var newUser = Ext.create('CrazyHat.model.Player',{
                name: 'Игрок № ' + (i+1)
            });
            users.push(newUser);
        }
        
        this.users = users;
    },
    
    // Возвращает данные о пользователях
    getUsersInfo: function(){
        return this.users;
    },
		
    onGameEnded: function() {
        var gameResults = this.users;
        this.fireEvent('gameEnded', gameResults);
    }
});
