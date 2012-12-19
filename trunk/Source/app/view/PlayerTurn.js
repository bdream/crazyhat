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
		
		// Количество слов в шляпе
		var wordsInHatLabel = Ext.Label({
			html: 'Words in Hat:' + this.wordsInHat,
			docked: 'top'
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
			wordsInHatLabel,
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
	
	// Возбуждает событие нажатия на кнопку получения следующего слова
	onNextWordButtonClick: function() {
		this.fireEvent('nextWordButtonClick');
	}
});
