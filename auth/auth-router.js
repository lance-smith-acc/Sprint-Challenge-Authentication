const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const Users = require('../users/users-model')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({ message: `Welcome ${saved.username}, thank you for registering!`, token, });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
   let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}, enjoy the jokes!`, token, });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const secret = require('./secret');

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSecret, options); 
}

module.exports = router;
