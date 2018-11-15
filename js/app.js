'use strict'

function Horns(obj) {
    this.image = obj.image_url;
    this.title = obj.title;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
    this.index = obj.index;
    this.page = obj.page;
    Horns.Array.push(this);
}

Horns.prototype.render = function() {
    const source = $('#photo-template').html();
    const template = Handlebars.compile(source);
    return template(this);
}

Horns.Array = [];
Horns.Keywords = [];
Horns.Filter = [];

Horns.readJson = () => {
    $.get('data/data1.JSON', 'json') 
    .then(data => {
        data.forEach( (obj, idx) => {
            obj.index = idx
            obj.page = 'pageOne'
            new Horns(obj);
            filter(Horns.Array[idx]);
        })
    })
    $.get('data/data2.JSON', 'json') 
    .then(data => {
        data.forEach( (obj, idx) => {
            obj.index = idx+20
            obj.page = 'pageTwo'
            new Horns(obj);
            filter(Horns.Array[idx]);
        })
    })
    .then(Horns.loadHorns)
    .then(renderFilter);
}

Horns.loadHorns = () => {
    Horns.Array.forEach(obj => {
        $('#firstSection').append(obj.render());
    })
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
            $(`div[id="${$selection}"]`).show();
        } else if($selection === 'default') {
            $('div').show();
        }
    })
});

$('#pageTurner').on('click', function(e) {
    let temp = e.target.id
    $('div').hide();
    console.log(temp)
    console.log()
    Horns.Array.forEach((obj) => {
        if(obj.page === temp){
        $(`div[class="${temp}"]`).show();
        }
})
})

function filter(obj) {
    if(Horns.Keywords.includes(obj.keyword) === false) {
        Horns.Keywords.push(obj.keyword);
    }
}

$(() => Horns.readJson());