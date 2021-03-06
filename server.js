const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

//app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (req, res) => { signin.handlerSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handlerRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handlerProfile(req, res, db)} )
app.put('/image', (req, res) => {image.handlerImage(req, res, db)} )
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )




app.listen(3001, ()=> {console.log('app running on port 3001')})


/*
/ --> res = this is working 
/ signin --> POST = success / fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/