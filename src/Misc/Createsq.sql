-- Create the User table
CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  folderName TEXT DEFAULT '',
  backupMegaAcc TEXT DEFAULT 'kondashivaradhan007@gmail.com',
  quota DECIMAL(10, 2) DEFAULT 1024.00
);

-- Create the UserRecords table
CREATE TABLE "UserRecords" (
  id SERIAL PRIMARY KEY,
  user_email_id INTEGER REFERENCES "User" (id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  tags VARCHAR(255) ARRAY,
  media TEXT ARRAY NULL
);