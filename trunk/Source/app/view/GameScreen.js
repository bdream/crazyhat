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
        	
        // Button to debug
        var button = new Ext.Button({
            docked: 'bottom',
            scope: this,
            text: 'Go to results',
            handler: this.onGameEnded
        });
			
        this.setItems([
            button
            ]);
    },
    
    // Хранилище слов
    wordsStore: null,
    
    // Игроки
    users: [],
    
    // Время на игру
    time: null,
    
    // Устанавливает настройки игры
    // settings - настройки игры
    // words - слова в текущей игре
    setGameSettings: function(settings, words){
        // Получает количество пользователей
        var countUsers = settings.personsCount;
        
        // Получает количество времени на игру
        this.time = {
            minutes: 0,
            seconds: settings.timeForRound
        }
        
        // Создает пользователей для игры
        var users = [];
        for(var i = 0; i <= countUsers; i++){
            var newUser = Ext.create('CrazyHat.model.Player',{
                name: 'Игрок № ' + (i+1)
            });
            users.push(newUser);
        }
        // Сохраняет пользователей
        this.users = users;
        
        // Сохраняет слова в хранилище слов
        // TODO: Использовать внешний источник для получения слов
        this.wordsStore = Ext.create('CrazyHat.model.WordsStore');
    },
    
    // Запускает игру
    startGame: function(){
        // # Создание экранов для игры
        
        // Создает экран хода игрока
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

                        // Set active game preparing screen
                        this.setActiveItem(editResultsAfterPlayerTurnView);
                    }
                    else{
                        wordsInHat--;
                    }

                    playerTurnView.setWordsInHat(wordsInHat);
                    
                    // Берет из хранилища очередное слово и показывает его
                    var currentWord = this.wordsStore.popRandomWord();
                    playerTurnView.setCurrentWord(currentWord);
                },
                timeOut: function(){
                    this.setActiveItem(editResultsAfterPlayerTurnView);
                }
            }
        });
        
        // Создает экран результатов хода игрока
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
        
        // # Настраивает форму для начала игры
        var firstPlayer = this.getNextPlayer()
        // Имя текущего пользователя
        // TODO: playerTurnView.setPlayerName(firstPlayer.name);
        // Очки, набранные игроком
        playerTurnView.setPlayerScore(firstPlayer.score);
        // Количество слов в шляпе
        var wordsInHat = this.wordsStore.getWordsCount();
        playerTurnView.setWordsInHat(wordsInHat);
        // Таймер
        playerTurnView.setTimer(this.time.minutes, this.time.seconds);
        
        // Устанавливает активной вкладку с игрой
        this.setActiveItem(playerTurnView);
    },
    
    // Номер текущего игрока в списке игроков
    currentPlayerNumber: null,
    
    // Возвращает информацию о следующем игроке
    getNextPlayer: function(){
        var nextPlayerNumber = this.currentPlayerNumber;
      
        // Если только начали игру
        if(nextPlayerNumber == null){
            nextPlayerNumber = 0;
            this.currentPlayerNumber = nextPlayerNumber;
            return this.users[nextPlayerNumber];
        }         
        
        // Увеличивает номер текущего игрока
        nextPlayerNumber++;
        
        // Если номер следующего игрока совпадает с количеством игроков,
        // значит прошел круг и снова очередь игрока с номером 0
        var playersCount = this.users.length;
        if(playersCount == nextPlayerNumber){
            nextPlayerNumber = 0;
            this.currentPlayerNumber = nextPlayerNumber; 
        }
        
        // Возвращает игрока
        return this.users[nextPlayerNumber];
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
