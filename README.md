 ToDo:
 --------

  - append something from DB to DOM
  - event listeners
  - add inputed names to dropdown
  - add inputed owner and pet to DB
  - append whole owner and pet object to DOM
  -

  - clean up DOM/CSS

register a new owner
assign a pet to an owner
check in a pet
check out a pet
update a pet's info
remove a pet altogether
You'll use CRUD to make this happen.

IMPORTANT: Please include a database.sql file in your submitted Git repo that has all the queries you used to create your database and tables.

Implementation Details
Guidance on how to build your app.

Database Table

Create a database of the pets with their check-in and check-out dates. Don't forget to add your primary keys!

Columns

owner first name
owner last name
pet name
breed
color
check-in date
check-out date
Views

This app will have one page: Owners and Pets

View 1: Owners and Pets

See this image for a mockup of the page.

NOTE: Ignore the Visits link you see on the image . This is reserved for Hard mode.

Submitting the Owner Registration form will add new owner info to the database.
The Pets form includes a <select> drop-down list that needs to be populated with data from the owners table. Submitting this form will add a new pet to the pets table. HINT: In addition to displaying the name, make sure to keep track of each owner's id.
The owner name should be displayed, but not editable.
All of the pet data displayed should be editable.
Clicking the Go button under the Update column should update the pets table.
Clicking the Go button under the Delete column should delete the pet from the pets table. HINT: Delete any visits for this pet before deleting it from the pets table.
The Check-InCheck-out button will default to displaying IN when a pet is first created.
Checking in a pet is done by inserting the current date into the check-in date column of the visits table. A checked-in pet will have a button that displays OUT.
Checking out a pet is done by updating the check-out date column record in the visits table.
Hard Mode
Create a second page for the application: Visits.

The Visits page will display the check-in data for each pet. Pets that are checked in, but not checked out should appear first in the list. We should see the following data:

Pet name
Check-in date
Checkout date
There is no mockup for this page, so be creative and do your best!
