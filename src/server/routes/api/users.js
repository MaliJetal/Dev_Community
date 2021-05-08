const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

//Load User Model
const User = require('../../model/User');

router.get('/test', (req, res) => res.json({ msg: 'User Works' }));

module.exports = router;