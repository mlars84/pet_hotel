CREATE TABLE owners_and_pets (
    id SERIAL PRIMARY KEY NOT NULL,
    ownerfirstname VARCHAR(12),
    ownerlastname VARCHAR(12),
    petname VARCHAR(12),
    breed VARCHAR(15),
    color VARCHAR(12),
    checkindate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// added checkoutdate column after creating table. Probably dont need it...
ALTER TABLE owners_and_pets ADD COLUMN checkoutdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

INSERT INTO owners_and_pets (ownerfirstname) VALUES ('George')
