import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import Shoe from './models/Shoe.js';
import User from './models/User.js';

// Configer dotenv to read config.env file
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Import data and store to a JavaScript array of objects
const shoes = JSON.parse(
  fs.readFileSync(new URL('./_data/shoes.json', import.meta.url), 'utf-8')
);

// Import data and store to a JavaScript array of objects
const users = JSON.parse(
  fs.readFileSync(new URL('./_data/users.json', import.meta.url), 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Shoe.create(shoes);
    await User.create(users);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Shoe.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

// Run in the terminal `node seeder.js -i` for importing data into DB
// Run in the terminal `node seeder.js -d` for destrying data in DB