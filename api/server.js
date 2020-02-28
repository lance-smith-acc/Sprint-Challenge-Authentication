const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const KnexStore = require('connect-session-knex')(session)
const knex = require('../database/dbConfig')

const sessionConfig = {
  name:'session-cookie',
  secret: 'sprint',
  resave: false,
  saveUninitialized: true, 
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true 
  },
  store:new KnexStore({
    knex,
    tablename:'sessions',
    createtable:true,
    sidfieldname:'sid',
    clearInterval: 1000 * 60 * 10,
    
  })
}


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
