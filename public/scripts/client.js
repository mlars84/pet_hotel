$(document).ready( onReady );
console.log('JQ');

function onReady() {
  console.log(' in onReady');
  getAll();
} // end OnReady

// get everything from database table
function getAll() {
  console.log('getAll');
  $.ajax({
    url: '/getAll',
    type: 'GET',
    success: function(response) {
      console.log(response);
    } // end success
  }); // end AJAX
} // end getAll
