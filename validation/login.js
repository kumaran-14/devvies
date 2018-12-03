const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Must be a proper Email'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field Required'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field Required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
