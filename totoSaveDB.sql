DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
	user_id VARCHAR(20) PRIMARY KEY,
	fullname VARCHAR(45),
	email VARCHAR(20) UNIQUE,
	phonenumber VARCHAR(45) UNIQUE,
	next_of_kin VARCHAR(45),
	next_of_kin_contact VARCHAR(10),
	password VARCHAR	
);

DROP TABLE IF EXISTS Accounts;
CREATE TABLE Accounts (
	user_id VARCHAR(20),
	account_id VARCHAR(20) PRIMARY KEY,
	name_of_child VARCHAR(45),
	date_of_birth VARCHAR(45),
    education_level VARCHAR(45),
    saving_frequency VARCHAR(45),
	currentbalance INT,
	date VARCHAR,
	FOREIGN KEY(user_id) 
	  	REFERENCES Users(user_id)
);

DROP TABLE IF EXISTS Savings;
CREATE TABLE Savings (
	user_id VARCHAR(20),
    savings_id VARCHAR(20) PRIMARY KEY,
	name_of_child VARCHAR(45),
	amount VARCHAR(45),
    date VARCHAR,
	FOREIGN KEY(user_id) 
	  	REFERENCES Users(user_id)
);