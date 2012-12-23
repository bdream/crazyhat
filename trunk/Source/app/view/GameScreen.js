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
        // # Создание первого экрана для игры
        this.currentTurnView = this.createCurrentPlayerTurnView();
        
        // # Настраивает форму для текущего хода
        var firstPlayer = this.getNextPlayer()
        // Имя текущего пользователя
        this.currentTurnView.setPlayerName(firstPlayer.data.name);
        // Очки, набранные игроком
        this.currentTurnView.setPlayerScore(0);
        // Количество слов в шляпе
        var wordsInHat = this.wordsStore.getWordsCount();
        this.currentTurnView.setWordsInHat(wordsInHat);
        // Таймер
        this.currentTurnView.setTimer(this.time.minutes, this.time.seconds);
        // Текущее слово (в начале игры пустое)
        this.currentTurnView.setCurrentWord('');
        
        // Устанавливает активной вкладку с игрой
        this.setActiveItem(this.currentTurnView);
    },
    
    currentTurnView: null,
    
    currentTurnResultView: null,
    
    // Угаданные слова за ход игрока
    playerTurnScoredWords: [],
    
    // Создает экран хода игрока
    createCurrentPlayerTurnView: function(oldEditResultsAfterPlayerTurnView){
        var playerTurnView = Ext.create('CrazyHat.view.PlayerTurn',{
            listeners: {
                scope: this,
                nextWordButtonClick: function(isTurnStart) {
                    console.log('nextWordButtonClick:' + isTurnStart);
                    // Если ход только начался
                    if(!isTurnStart){
                        // Изменяет название кнопки
                        playerTurnView.setNextWordButtonLabel('Отгадали');
                        
                        // Запускает таймер
                        playerTurnView.runTimer();
                    }
                    // Если это продолжение хода
                    else{
                        // Удаляет из хранилища объясненное слово
                        var scoredWord = this.wordsStore.popCurrentWord();
                        // Помещает его в список угаданных за этот ход слов
                        this.playerTurnScoredWords.push(scoredWord);
                        
                        playerTurnView.setPlayerScore(this.playerTurnScoredWords.length);
                    }
                    
                    // Берет количество слов в хранилище
                    var wordsInHatCount = this.wordsStore.getWordsCount();
                    
                    // Если в хранилище еще есть слова
                    if(wordsInHatCount > 0){
                        // Берет случайное слово из хранилища
                        var currentWord = this.wordsStore.getRandomWord();
                        
                        // Устанавливает количество слов в шляпе
                        playerTurnView.setWordsInHat(wordsInHatCount);
                        // Устанавливает текущее слово для отображения
                        playerTurnView.setCurrentWord(currentWord);
                    }
                    else{
                        // Если слова в хранилище закончились, обнуляет таймер
                        playerTurnView.breakTimer();
                    }
                },
                timeOut: function(){
                    this.currentTurnResultView = this.createEditResultsAfterPlayerTurnView(playerTurnView);
                    
                    // Передает список угаданных слов в форму с результатами текущего хода
                    this.currentTurnResultView.setWords(this.playerTurnScoredWords);
                    // Очищает список слов
                    this.playerTurnScoredWords = [];
                    
                    this.setActiveItem(this.currentTurnResultView);
                }
            }
        });
        
        return playerTurnView;
    },
    
    // Создает экран результатов хода игрока
    createEditResultsAfterPlayerTurnView: function(oldPlayerTurnView){
        var editResultsAfterPlayerTurnView = Ext.create('CrazyHat.view.EditResultsAfterPlayerTurn',{
            listeners: {
                scope: this,
                buttonclick: function(){ 
                    // Устанавливает название кнопки
                    this.currentTurnView.setNextWordButtonLabel('Старт');
                    
                    // Получает количество правильно объясненных слов
                    var correctExplanationWords = editResultsAfterPlayerTurnView.getCountCheckedWords();
                    // Увеличивает количество очков текущего игрока
                    this.increaseCurrentPlayerScore(correctExplanationWords)
                   
                    // Если в хранилище нет слов, то переходит к экрану результатов
                    var countWordsInHat = this.wordsStore.getWordsCount();
                    if(countWordsInHat <= 0){
                        // Вызывает метод завершения игры
                        this.gameEnded();
                        return;
                    }
                   
                    // # Настраивает форму для текущего хода
                    var currentPlayer = this.getNextPlayer();
                    // Имя текущего пользователя
                    this.currentTurnView.setPlayerName(currentPlayer.data.name);
                    // Очки, набранные игроком
                    this.currentTurnView.setPlayerScore(0);
                    // Количество слов в шляпе
                    var wordsInHat = this.wordsStore.getWordsCount();
                    this.currentTurnView.setWordsInHat(wordsInHat);
                    // Таймер
                    this.currentTurnView.setTimer(this.time.minutes, this.time.seconds);
                    // Текущее слово (в начале хода игрока пустое)
                    this.currentTurnView.setCurrentWord('');
                    
                    // Устанавливает значение, что ход еще не начался
                    this.currentTurnView.setIsTurnStarted(false);
                    
                    // Set active game preparing screen
                    this.setActiveItem(this.currentTurnView);
                }
            }
        });
        
        return editResultsAfterPlayerTurnView;
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
        }
        
        // Устанавливает номер текущего игрока
        this.currentPlayerNumber = nextPlayerNumber;
        
        // Возвращает игрока
        return this.users[nextPlayerNumber];
    },
    
    // Увеличивает количество очков текущего игрока
    increaseCurrentPlayerScore: function(newScore){
        var playerNumber = this.currentPlayerNumber;
        var currentPlayer = this.users[playerNumber];
        currentPlayer.data.score += newScore;
    },
    
    // Возвращает данные о пользователях
    getUsersInfo: function(){
        return this.users;
    },
		
    gameEnded: function() {
        var gameResults = this.users;
        this.fireEvent('gameEnded', gameResults);
    }
});
