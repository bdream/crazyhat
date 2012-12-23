Ext.define('CrazyHat.model.WordsStore',{
    
    // Список слов
    wordList: [
        'Линейка',
        'Кактус',
        'Гардемарин',
        'Лютик',
        'Принцесса',
        'Иголка',
        'Шапка',
        'Кастрюля',
        'Карамель',
        'Картуз',
        'Указатель',
        'Дорога',
        'Вермишель'
    ],   
    
    currentWordIndex: null,
    
    // Возвращает случайное слово (не удаляет его из хранилища)
    // Значение текущего слова устанавливается в значение случайного слова
    getRandomWord: function(){
        var wordList = this.wordList;
        
        var wordsCount = wordList.length;
        
        // Возвращает индекс случайного слова
        var randomIndex = Math.floor(Math.random() * wordsCount);
        
        this.currentWordIndex = randomIndex;
        
        // Возвращает это слово
        return wordList[randomIndex];
    },
    
    // Вынимает из списка слов текущее слово
    popCurrentWord: function(){
        if(currentWordIndex != null){
            wordList.splice(currentWordIndex, 1);
            this.currentWordIndex = null;  
        }
    },
    
    // Возвращает количество слов
    getWordsCount: function(){
        return this.wordList.length;
    }
})

