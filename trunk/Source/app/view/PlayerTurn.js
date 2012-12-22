/* 
Game preparing screen of Application

Events:
	buttonclick - fired, when button clicked
        timeOut - fired, when timeout
 */

Ext.define("CrazyHat.view.PlayerTurn", {
    extend: 'Ext.Panel',

    requires: [
        'Ext.Msg',
        'Ext.Label',
        'Ext.util.DelayedTask'
    ],

    config: {
        items: [
        {
            xtype: 'label',
            itemId: 'wordsInHat',
            html: 'This is an item'
        },
        {
            xtype: 'label',
            itemId: 'playerScoreLabel',
            html: 'This is player score label'
        },
        {
            xtype: 'label',
            itemId: 'timerLabel',
            html: 'This is timer label'                                
        }
        ]
    },

    initialize : function() {
        this.callParent();

        // Слово для объяснения
        var currentWordLabel = new Ext.Label({
            html: 'Current word',
            centered: true
        });

        // Кнопка получения следующего слова
        var buttonNextWord = new Ext.Button({
            docked: 'bottom',
            scope: this,
            text: 'Next word',
            handler: this.onNextWordButtonClick
        });

        // Количество угаданных слов текущего игрока
        var playerScoreLabel = Ext.Label({
            html: "Player's score:" + this.playerScore,
            docked: 'top'
        });

        var timerLabel = Ext.Label({
            html: this.timer,
            docked: 'top'
        });

        this.setItems([
            playerScoreLabel,
            timerLabel,
            currentWordLabel,
            buttonNextWord
            ]);
    },
	
    // Количество слов в шляпе
    wordsInHat: 0,

    // Счет игрока
    playerScore: 0,

    // Устанавливает количество слов в шляпе
    setWordsInHat: function(count) {
        var wordsInHatLabel = this.getComponent('wordsInHat');
        resultString = "Words in Hat: " + count;
        wordsInHatLabel.setHtml(resultString);
    },

    // Устанавливает количество очков у игрока
    setPlayerScore: function(count) {
        var playerScoreLabel = this.getComponent('playerScoreLabel');
        resultString = "Player's score: " + count;
        playerScoreLabel.setHtml(resultString);
    },

    // Возбуждает событие нажатия на кнопку получения следующего слова
    onNextWordButtonClick: function() {
        this.fireEvent('nextWordButtonClick');
    },
    
    // Timer
    minutes: 0,
    seconds: 0,
    
    // Функция устанавливает время на ход
    setTimer: function(min, sec){
        this.minutes = min;
        this.seconds = sec;
        
        this.updateTimer();
    },
    
    // Функция обновляет таймер
    updateTimer: function(){
        var timerLabel = this.getComponent('timerLabel');
        var resultString = this.minutes + ':' + this.seconds;
        timerLabel.setHtml(resultString);
    },

    // Функция запускает таймер
    runTimer: function () {
        this.countDown();
    },
    
    // Функция уменьшает значение таймера на секунду
    countDown: function(){
        
        if (this.seconds < 1 && this.minutes > 0) {
            this.minutes -= 1;
            this.seconds = 60;
        }
        
        // Когда время время закончилось, возбуждает событие
        if (this.minutes == 0 && this.seconds == 1) {
            // 'timeout' event rising
            this.fireEvent('timeOut');
            return;
        }
            
        this.seconds -= 1;
        
        alert(this.minutes + ':' + this.seconds);
        
        // Обновляет представление таймера
        this.updateTimer();

        var countDown = this.countDown;
        var task = Ext.create('Ext.util.DelayedTask', function(){
            countDown();
        });
        task.delay(1000);     
    }
});
