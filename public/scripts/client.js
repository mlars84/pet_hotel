$(document).ready( onReady );
console.log('JQ');

function onReady() {
  console.log(' in onReady');
  getAll();
  $('#register').on('click', register);
  $('#addPet').on('click', addPet);
  $('#update').on('click', updatePet);
  $('#delete').on('click', deletePet);

} // end OnReady

// function that adds owner to dropdown
function register() {
  var ownerObject = {
    ownerfirstname: $('#firstName').val(),
    ownerlastname: $('#lastName').val()
  }; // end ownerObject
  // TODO check if owner is arleady registered
  // send to database
  console.log('in register owner: ', ownerObject);
  $.ajax({
    url: '/registerOwner',
    type: 'POST',
    data: ownerObject,
    success: function ( response ) {
      console.log('back from server with', response);
      getAll();
    } // end success
  }); // end ajax /registerOwner POST
} // end register

// addPet to databse under owner
function addPet () {
  var ownerId = $('#ownerName').data('id');
  var petObject = {
    id: ownerId,
    petname: $('#petName').val(),
    breed: $('#breed').val(),
    color: $('#color').val()
  }; // end petObject
  // TODO check if owner is arleady registered
  $.ajax({
    url: '/addPet',
    type: 'POST',
    data: petObject,
    success: function(response) {
      console.log( response );
    }
  });
} // end addPet

// get everything from database table
function getAll() {
  console.log('getAll');
  $.ajax({
    url: '/getAll',
    type: 'GET',
    success: function(response) {
      console.log(response);
      // fill drop-down menu
      $('#ownerName').empty();
      $('#listAll').empty();
      for (var i = 0; i < response.length; i++) {
        $('#ownerName').append('<option data-id="' + response[i].id + '">' + response[i].ownerfirstname + ' ' + response[i].ownerlastname + '</option>');
        $('#listAll').append('<nav id="' + response[i].id + '" data-id="' + response[i].id + '"><input type="text" id="listOwnerName' + i + '"><input type="text" id="listPetName' + i + '"><input type="text" id="listBreed' + i + '"><input type="text" id="listColor' + i + '"><button id="updateButton" type="button">GO</button><button id="deleteButton" type="button">DEL</button><button id="checkInOut" type="button">IN</button></nav>');
        $('#listOwnerName' + i + '').val(response[i].ownerfirstname + ' ' + response[i].ownerlastname);
        $('#listPetName').val(response[i].petname);
        $('#listBreed').val(response[i].breed);
        $('#listColor').val(response[i].color);
      }
    } // end success
  }); // end AJAX
} // end getAll

//function that updates the pet in current column
function updatePet() {

} // end updatePet

// function to delete pet from current column
function deletePet() {

} // end deletePet
