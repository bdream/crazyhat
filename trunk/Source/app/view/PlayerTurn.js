/* 
Game preparing screen of Application

Events:
	buttonclick - fired, when button clicked
*/

Ext.define("CrazyHat.view.PlayerTurn", {
	extend: 'Ext.Panel',
	
	requires: [
		'Ext.Msg',
		'Ext.Label'
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
	
	// Количество времени оставшееся на ход
	timer: '00:00',
	
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
	}
});
