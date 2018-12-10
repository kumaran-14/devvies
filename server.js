const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./config/keys').mongoURI
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => consolusersuserse.error(err))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./config/passport')(passport)


app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

// for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))
