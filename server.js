const express = require('express');
const routes = require('./routes');
// import sequelize connection
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();
const model = require( './models/index.js')

const app = express();
const PORT = process.env.PORT || 3001;

const hostName = process.env.HOST|| 'localhost';
const db = process.env.DB;
const dbUser = process.env.DBUSER;
const dbPass = process.env.DBPASS;

const sequelize = require('./config/connection');

// const sequelize = new Sequelize(db, dbUser,dbPass,{
//   host: hostName,
//   dialect: 'mysql'
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
async function testDBConnection(){console.log('test connection');
  try{
    console.log("sequelize", sequelize);
    await sequelize.authenticate();
    console.log('connection has been established successfully');
  } catch(error){
    console.log('unable to connect to DB');
  }};

  testDBConnection();

async function sync(){
  await sequelize.sync({force:true});
};

  sync().then(() => {console.log("sync then complete");});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
