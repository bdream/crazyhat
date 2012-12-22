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
            // Количество слов в шляпе (надпись)
            {
                xtype: 'label',
                itemId: 'wordsInHatLabel',
                html: 'Words in Hat:'
            },
            // Количество слов в шляпе
            {
                xtype: 'label',
                itemId: 'wordsInHatValue',
                html: '0'
            },
            
            // Количество очков игрока (надпись)
            {
                xtype: 'label',
                itemId: 'scoreLabel',
                html: 'Score:'
            },
            // Количество очков игрока
            {
                xtype: 'label',
                itemId: 'scoreValue',
                html: '0'
            },
            
            // Таймер
            {
                xtype: 'label',
                itemId: 'timerValue',
                html: '00:00'                                
            },
            
            // Слово для объяснения
            {
                xtype: 'label',
                itemId: 'currenWordValue',
                centered: true,
                html: 'Current word'                            
            }
        ]
    },

    initialize : function() {
        this.callParent();

        // Кнопка получения следующего слова
        var buttonNextWord = new Ext.Button({
            docked: 'bottom',
            scope: this,
            text: 'Next word',
            handler: this.onNextWordButtonClick
        });

        this.setItems([
            buttonNextWord
            ]);
    },
	
    // Количество слов в шляпе
    wordsInHat: 0,

    // Счет игрока
    playerScore: 0,

    // Устанавливает количество слов в шляпе
    setWordsInHat: function(count) {
        var wordsInHatValue = this.getComponent('wordsInHatValue');
        wordsInHatValue.setHtml(count);
    },

    // Устанавливает количество очков у игрока
    setPlayerScore: function(count) {
        var scoreValue = this.getComponent('scoreValue');
        scoreValue.setHtml(count);
    },
    
    // Устанавливает текущее слово для обсуждения
    setCurrentWord: function(word){
        var currenWordValue = this.getComponent('currenWordValue');
        currenWordValue.setHtml(word);
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
        var timerValue = this.getComponent('timerValue');
        var resultString = this.minutes + ':' + this.seconds;
        timerValue.setHtml(resultString);
    },

    // Функция запускает таймер
    runTimer: function () {
        this.countDown(this);
    },
    
    // Функция уменьшает значение таймера на секунду
    countDown: function(scope){
        
        if (scope.seconds < 1 && scope.minutes > 0) {
            scope.minutes--;
            scope.seconds = 60;
        }
        
        // Когда время время закончилось, возбуждает событие
        if (scope.minutes == 0 && scope.seconds == 1) {
            // 'timeout' event rising
            scope.fireEvent('timeOut');
            return;
        }
            
        scope.seconds--;
        
        // Обновляет представление таймера
        scope.updateTimer();

        var countDown = scope.countDown;
        var task = Ext.create('Ext.util.DelayedTask', function(){
            countDown(scope);
        });
        task.delay(1000);     
    }
});
