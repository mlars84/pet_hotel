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
  ownersAndPets = [];
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

// register owner post
app.post( '/registerOwner', function ( req, res ) {
  console.log('in /registerOwner', req.body);
  pool.connect(function( err, connection, done ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 400 );
    } else {
        console.log('connect to DB in registerOwner');
        connection.query( 'INSERT INTO owners_and_pets (ownerfirstname, ownerlastname) VALUES ( $1, $2);', [ req.body.ownerfirstname, req.body.ownerlastname ] );
        done();
        res.sendStatus( 201 );
    } // end if/else
  }); // end Pool
}); // end registerOwner POST

// add pet POST
app.post( '/addPet', function ( req, res ) {
  console.log('in /addPet', req.body);
  pool.connect(function( err, connection, done ) {
    if( err ) {
      console.log( err );
      res.sendStatus( 400 );
    } else {
        console.log('connect to DB in addPet');
        connection.query( 'UPDATE owners_and_pets set petname=$2, breed=$3, color=$4 WHERE id=$1 ;', [ req.body.petname, req.body.breed, req.body.color, req.body.id  ] );
        done();
        res.sendStatus( 201 );
    } // end if/else
  });
  res.sendStatus( 201 );
}); // end addPet POST

// listens
app.listen(port, function( req, res ){
  console.log('listening on port', port);
});
