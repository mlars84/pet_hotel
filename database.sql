CREATE TABLE owners_and_pets (
    id SERIAL PRIMARY KEY NOT NULL,
    ownerfirstname VARCHAR(12),
    ownerlastname VARCHAR(12),
    petname VARCHAR(12),
    breed VARCHAR(15),
    color VARCHAR(12),
    checkindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
// had to add checkoutdate column after creating table
ALTER TABLE owners_and_pets ADD COLUMN checkoutdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
