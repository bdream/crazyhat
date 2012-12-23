/*
 * Класс данных об игроке
 *
 * Данные об игроке:
 * Имя,
 * Очки
 */

Ext.define('CrazyHat.model.Player', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            // Имя
            {name: 'name',  type: 'string', defaultValue: ''},
            // Очки
            {name: 'score',   type: 'int', defaultValue: 0}
        ]
    }
});

