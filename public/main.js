'use strict'

$(() => {

  let cats = catsFromStorage();
  let $lis = cats.map(cat => createLi(cat));

});


function createLi(cat){
  let $li = $('#template').clone();
  $li.removeAttr('id');
  $li.children('.cat').text(cat);
  return $li;
}

function addCat(e){
  e.preventDefault();

  let name = $('#name').val();
  let type = $('#type').val();
  let color = $('#color').val();

  let cat = $('#name').val() + " " + $('#type').val() + " " + $('#color').val();

  $('#name').val('');
  $('#type').val('');
  $('#color').val('');

  let $li = createLi(cat);
  $('#cat').append($li);
  addToStorage(cat);
}

function addToStorage(cat){
  let cats = catsFromStorage();

  cas.push(cat);

  writeToStorage(cats);
}

function catsFromStorage(){
  let json = localStorage.cats;
  let cats;

  try{
    cats = JSON.parse(json);
  }catch(event){
    cats = [];
  }
  return cats;  
}