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
    
    // Возвращает случайное слово (не удаляет его из хранилища)
    popRandomWord: function(){
        var wordList = this.wordList;
        
        var wordsCount = wordList.length;
        
        // Возвращает индекс случайного слова
        var randomIndex = Math.floor(Math.random() * wordsCount);

        // Возвращает это слово, удаляет его из списка слов
        return wordList.splice(randomIndex, 1);
    },
    
    // Помещает слово обратно в хранилище
    pushWord: function(word){
        this.wordList.push(word);
    },
    
    // Возвращает количество слов
    getWordsCount: function(){
        return this.wordList.length;
    }
})

