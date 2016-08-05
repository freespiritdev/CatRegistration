'use strict'

console.log("Hey!");


$(() => {
  $('table').on('click', '.delete', deleteCat);

});

function deleteCat(){
  console.log("Deleted!");

  let catId = $(this).closest('tr').data('id'); //closest ancestor that matched the tr
  // console.log('catId:', catId);

  $.ajax(`/cats/${catId}`, {//api call
    method: 'DELETE'
  }) 
  .done(() => {
     console.log("Success!");
      renderList();                      //Update the DOM hy rendering it
     // $(this).closest('tr').remove() //update the DOM

     //update DOM
  })
  .fail(err => {
     console.log('err:', err);
  });
}

function renderList() {
  $.get('/cats')
  .done(cats => {
  
    let $trs = cats.map(cat =>{
      let $tr = $('template').clone();
      $tr.removeAttr('id');
      $tr.find('.name').text(cat.name);
      $tr.find('.type').text(cat.type);
      $tr.find('.color').text(cat.color);
      $tr.data('id', cat.id);
      return $tr;
    })
    $('#catList').empty().append($trs);

  });
}
