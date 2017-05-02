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

function populateDropDown() {
  $.ajax({
    url: '/getOwners',
    type: 'GET',
    success: function(response) {
      console.log(response);
      var ownerNames = [];
      $('#ownerName').empty();
      for (var i = 0; i < response.length; i++) {
        console.log(response[i]);
      $('#ownerName').append('<option value="' + response[i].id + '">' + response[i].first_name + ' ' + response[i].last_name + '</option>');
        // ownerNames.push(response[i].first_name + ' ' + response[i].last_name);
      }
    }
  });
} // end populateDropDown

// function that adds owner to dropdown
function register() {
  var ownerObject = {
    first_name: $('#firstName').val(),
    last_name: $('#lastName').val()
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
  var ownerId = $('#ownerName').val();
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
  setTimeout(getAll(), 1000);
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
      $('#listAll').empty();
      for (var i = 0; i < response.length; i++) {
        $('#listAll').append('<nav id="' + response[i].id + '" data-id="' + response[i].id + '"><input type="text" id="listOwnerName' + i + '"><input type="text" id="listPetName' + i + '"><input type="text" id="listBreed' + i + '"><input type="text" id="listColor' + i + '"><button id="updateButton" type="button">GO</button><button id="deleteButton" type="button">DEL</button><button id="checkInOut" type="button">IN</button></nav>');
        $('#listOwnerName' + i + '').val(response[i].first_name + ' ' + response[i].last_name);
        $('#listPetName' + i + '').val(response[i].pet_name);
        $('#listBreed' + i + '').val(response[i].breed);
        $('#listColor' + i + '').val(response[i].color);
      }
      populateDropDown();
    } // end success
  }); // end AJAX
} // end getAll

//function that updates the pet in current column
function updatePet() {

} // end updatePet

// function to delete pet from current column
function deletePet() {

} // end deletePet
