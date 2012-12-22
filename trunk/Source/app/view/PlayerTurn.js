﻿/* 
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
        id: 'playerTurn',
        cls: 'playerTurncls',
        items: [
            {
                cls: 'containerPlayerInfo',
                itemId: 'playerInfo',
                xtype: 'container',
                items: [
                    // Текущий игрок (надпись)
                    {
                        cls: 'playerLabel',
                        xtype: 'label',
                        itemId: 'wordsInHatLabel',
                        html: 'Player:'
                    },
                    // Текущий игрок
                    {
                        cls: 'playerValue',
                        xtype: 'label',
                        itemId: 'wordsInHatValue',
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
                                html: 'Words in Hat:'
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
        var infoContainer = this.getComponent('infoContainer');
        var container  = infoContainer.getComponent('containerRight');
        var wordsInHatValue = container.getComponent('wordsInHatValue');
        wordsInHatValue.setHtml(count);
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
