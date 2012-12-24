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
        scrollable: {
            direction: 'vertical'
        },
        
        id: 'playerTurn',
        cls: 'playerTurncls',
        items: [
            {
                cls: 'containerPlayerInfo',
                itemId: 'containerPlayerInfo',
                xtype: 'container',
                items: [
                    // Текущий игрок (надпись)
                    {
                        cls: 'playerLabel',
                        xtype: 'label',
                        itemId: 'playerLabel',
                        html: 'Игрок:'
                    },
                    // Текущий игрок
                    {
                        cls: 'playerValue',
                        xtype: 'label',
                        itemId: 'playerValue',
                        html: 'CurrentPlayer'
                    }
                ]
            },
            {
                cls: 'infoContainer h-clearfix',
                itemId: 'infoContainer',
                xtype: 'container',
                items: [
                    {
                        cls: 'containerWordsInHat',
                        itemId: 'containerRight',
                        xtype: 'container',
                        items: [
                            // Количество слов в шляпе (надпись)
                            {
                                cls: 'topWordsInHat',
                                xtype: 'label',
                                itemId: 'wordsInHatLabel',
                                html: 'Words&nbsp;in&nbsp;Hat:'
                            },
                            // Количество слов в шляпе
                            {
                                cls: 'bottomWordsInHat',
                                xtype: 'label',
                                itemId: 'wordsInHatValue',
                                html: '0'
                            }
                        ]
                    },
                    {
                        cls: 'containerTimer',
                        itemId: 'containerCenter',
                        xtype: 'container',
                        items: [
                            // Таймер
                            {
                                cls: 'topCenter',
                                itemId: 'timerValue',
                                xtype: 'label',
                                html: '00:00'                                
                            }
                        ]
                    },
                    {
                        cls: 'containerScore',
                        itemId: 'containerLeft',
                        xtype: 'container',
                        items: [
                            // Количество очков игрока (надпись)
                            {
                                cls: 'topScore',
                                xtype: 'label',
                                itemId: 'scoreLabel',
                                html: 'Score:'
                            },
                            // Количество очков игрока
                            {
                                cls: 'bottomScore',
                                xtype: 'label',
                                itemId: 'scoreValue',
                                html: '0'
                            },
                        ]
                    }, 
                ]
            },
            {
                cls: 'containerCurrentWord',
                itemId: 'containerCurrentWord',
                xtype: 'container',
                items: [
                    // Слово для объяснения
                    {
                        xtype: 'label',
                        itemId: 'currenWordValue',
                        centered: true
                    }
                ]
            }
        ]
    },

    initialize : function() {
        this.callParent();

        // Кнопка получения следующего слова
        var buttonNextWord = new Ext.Button({
            itemId: 'nextWordButton',
            docked: 'bottom',
            scope: this,
            text: 'Старт',
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
        var infoContainer = this.getComponent('infoContainer');
        var container  = infoContainer.getComponent('containerRight');
        var wordsInHatValue = container.getComponent('wordsInHatValue');
        wordsInHatValue.setHtml(count);
    },
    
    setPlayerName: function(name){
        var infoContainer = this.getComponent('containerPlayerInfo');
        var scoreValue = infoContainer.getComponent('playerValue');
        scoreValue.setHtml(name);
    },

    // Устанавливает количество очков у игрока
    setPlayerScore: function(count) {
        var infoContainer = this.getComponent('infoContainer');
        var container  = infoContainer.getComponent('containerLeft');
        var scoreValue = container.getComponent('scoreValue');
        scoreValue.setHtml(count);
    },
    
    // Устанавливает текущее слово для обсуждения
    setCurrentWord: function(word){
        var containerCurrentWord = this.getComponent('containerCurrentWord');
        var currenWordValue = containerCurrentWord.getComponent('currenWordValue');
        currenWordValue.setHtml(word);
    },
    
    // Показывает находится ли форма в состоянии начала хода
    isTurnStarted: false,
    
    setIsTurnStarted: function(value){
        this.isTurnStarted = value;
    },
    
    // Возбуждает событие нажатия на кнопку получения следующего слова
    onNextWordButtonClick: function() {
        // Сохраняет текущее значение состояния формы
        var isTurnStarted = this.isTurnStarted;
        console.log('beforenextWordButtonClick event ' + this.isTurnStarted);
        // Устанавливает, что ход уже начался
        this.isTurnStarted = true;
        
        console.log('nextWordButtonClick event ' + isTurnStarted);
        this.fireEvent('nextWordButtonClick', isTurnStarted);
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
        var infoContainer = this.getComponent('infoContainer');
        var container = infoContainer.getComponent('containerCenter');
        var timerValue = container.getComponent('timerValue');
        
        // Формирует визуальное представление таймера
        // Если одна цифра, в секундах или минутах, то добавляет '0' перед ней
        var minutes = (this.minutes < 10) ? ('0' + this.minutes) : this.minutes;
        var seconds = (this.seconds < 10) ? ('0' + this.seconds) : this.seconds;
        var resultString = minutes + ':' + seconds;
        
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
        if (scope.minutes == 0 && scope.seconds <= 0) {
            // Устанавливает значение, что ход еще не начался
            this.isTurnStarted = false;
            console.log(this.isTurnStarted);
            
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
    },
    
    // Функция обнуляет таймер
    breakTimer: function(){
        this.minutes = 0;
        this.seconds = 0;
        
        this.isTurnStarted = false;
    },
    
    // Устанавливает название кнопки вызова следующего слова
    setNextWordButtonLabel: function(label){
        var button = this.getComponent('nextWordButton');
        button.setHtml(label);
    }
});
