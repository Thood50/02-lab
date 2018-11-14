'use strict'

let grabData = function() {
    $.getJSON('data.json', data => {
        data.forEach(object => {
            new Horns(object);
        })
    }).then( renderHorns );
}