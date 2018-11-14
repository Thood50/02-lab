'use strict'

function Horns(obj) {
    this.image = obj.image_url;
    this.title = obj.title;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
}

Horns.prototype.render = function() {
    $('main').append('<div class="horny"></div>');
    let objHorny = $('div[class="horny"]');
    let objHtml = $('#photo-template').html();
    objHorny.html(objHtml);

    objHorny.find('img').attr('src', this.image);
    objHorny.find('h2').text(this.title);
    objHorny.find('p').text(this.description);
    objHorny.find('img').attr('alt', this.keyword);
    objHorny.removeClass('clone');
    objHorny.attr('class', this.keyword);
}

Horns.Array = [];

Horns.readJson = () => {
    $.get('data.JSON', 'json') 
    .then(data => {
        data.forEach(obj => {
            Horns.Array.push(new Horns(obj));
        })
    })
    .then(Horns.loadHorns)
}

Horns.loadHorns = () => {
    Horns.Array.forEach(obj => obj.render());
    console.log('ran loadHorns');
}

$(() => Horns.readJson());