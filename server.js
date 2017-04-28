// requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var pg = require('pg');
var port = 3000;

var config = {
  database: 'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 10
};

var pool = new pg.Pool( config );

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// base url hit
app.get('/', function(req, res){
  console.log('/ url hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

var ownersAndPets = [];

//app.get for /getAll ajax
app.get( '/getAll', function( req, res ) {
  console.log('in /getAll');
  pool.connect(function( err, connection, done ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 400 );
    } else {
        console.log('connect to DB');
        var resultSet = connection.query( 'SELECT * FROM owners_and_pets' );
        resultSet.on( 'row', function( row ) {
          ownersAndPets.push( row );
        }); // end result.on
        resultSet.on('end', function() {
          done();
          res.send( ownersAndPets );
        }); // end on end
    } // end if/else
  }); // end Pool
}); // end /getAll




// listens
app.listen(port, function( req, res ){
  console.log('listening on port', port);
});
