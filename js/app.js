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
Horns.Keywords = [];
Horns.Filter = [];

Horns.readJson = () => {
    $.get('data.JSON', 'json') 
    .then(data => {
        data.forEach( (obj, idx) => {
            Horns.Array.push(new Horns(obj));
            filter(Horns.Array[idx]);
        })
    })
    .then(Horns.loadHorns)
    .then(renderFilter);
}

Horns.loadHorns = () => {
    Horns.Array.forEach(obj => obj.render());
}

function renderFilter() {
    Horns.Keywords.forEach( idx => {
        let $newOption = $('#option').clone();
        $newOption.text(idx);
        $newOption.val(idx);
        $('select').append($newOption);
    })
}

$('#select').on('change', function() {
    let $selection = $(this).val();
    console.log($(this).val());
    $('div').hide();
    Horns.Array.forEach(idx => {
        if($selection === idx.keyword) {
            $(`div[class="${$selection}"]`).show();
        } else if($selection === 'default') {
            $('div').show();
        }
    })
});

function filter(obj) {
    if(Horns.Keywords.includes(obj.keyword) === false) {
        Horns.Keywords.push(obj.keyword);
    }
}


$(() => Horns.readJson());