const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
//Authentication libraries
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load User Model
const User = require('../../models/User');

router.get('/test', (req,res) => res.json({msg : 'User Router works!'}));

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post('/register', (req,res) => {
  User.findOne({email: req.body.email}).then(user => {
    if(user){
      const errors = 'Email already exists!';
      return res.status(400).json(errors);
    }
    else{
      const avatar = gravatar.url(req.body.email, {
        s:'200', //size
        r:'pg',  //rating
        d:'mm'  //default mm- gives no profile icon
      });
      const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        avatar,
        password: req.body.password
      });
      //generate password hash
      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
			 if(err) throw err;				 
            newUser.password = hash,
            newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  //const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const email = req.body.email;
  const password = req.body.password;
  const errors = {};

  // Find user by email
  User.findOne({ email }).then(user => {  //email : email (const local)-> due to same name it is just email 
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
		      //{ algorithm: 'HS256' },
          { expiresIn: 36000 },
          (err, token) => {
            if(err)
              throw err;
            else{
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  }).catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get('/current',
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
    console.log(req);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;