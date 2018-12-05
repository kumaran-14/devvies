const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../../models/User')
const keys = require('../../config/keys')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route    GET /api/users/test
// @desc     Test route
// @access   Public
router.get('/test', (req, res) => res.json({ msg: 'Ahoy users!' }))

// @route    POST /api/users/register
// @desc     Register a user
// @access   Public
router.post('/register', (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'User already exists'
        return res.status(400).json(errors);
      }

      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error(err)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.error(err)
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.error(err))
        })
      })
    })
    .catch( err => console.error(err))
})

// @route    POST /api/users/login
// @desc     Login route
// @access   Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id : user.id, email : user.name, avatar:user.avatar}
            jwt.sign(
              payload,
              keys.jwtKey,
              { expiresIn: 3600},
              (err, token) => {
                if (err) console.log(err)
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            errors.password = 'Wrong Password'
            return res.status(400).json(errors)
          }
        })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// @route    POST /api/users/current
// @desc     return current user
// @access   Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: '!Messi wins balondor!' })
})

module.exports = router
