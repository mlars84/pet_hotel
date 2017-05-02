// requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var pg = require('pg');
var port = 3000;

var config = {
  database: 'new_pet_hotel',
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

// GET response to populate dropdown
app.get('/getOwners', function(req, res) {
  console.log('in /getOwners');
  var allOwners = [];
  pool.connect(function(err, connection, done) {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }
      else {
          console.log('connected to DB');
          var resultSet = connection.query("SELECT id, first_name, last_name FROM owners");
          resultSet.on( 'row', function( row ) {
            allOwners.push( row );
          }); // end result.on
          resultSet.on('end', function() {
            done();
            res.send( allOwners );
          });
      }
  });
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
        var resultSet = connection.query( 'SELECT owners.id, first_name, last_name, pet_name, breed, color FROM owners ' +
        'JOIN pets_and_owners ON owners.id = pets_and_owners.owners_id ' +
        'JOIN pets ON pets_and_owners.pets_id = pets.id;' );

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
        connection.query( 'INSERT INTO owners (first_name, last_name) VALUES ( $1, $2);', [ req.body.first_name, req.body.last_name ] );
        done();
        res.sendStatus( 200 );
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
        console.log('connect to DB in addPet', req.body.id);
        connection.query("INSERT INTO pets (pet_name, breed, color) VALUES ($1, $2, $3);", [req.body.petname, req.body.breed, req.body.color]);
        connection.query("SELECT id from pets ORDER BY id desc limit 1;", function ( err, results) {
          var newPetId = results.rows[0].id;
          connection.query("INSERT INTO pets_and_owners (owners_id, pets_id) VALUES ($1, $2);", [req.body.id, newPetId]);
        });
        done();
        res.sendStatus( 201 );
    } // end if/else
  });
  // res.sendStatus( 201 );
}); // end addPet POST

// listens
app.listen(port, function( req, res ){
  console.log('listening on port', port);
});
