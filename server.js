const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const db = require('./config/keys').mongoURI
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')


mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => consolusersuserse.error(err))

app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

app.get('/', (req, res) => {
  res.send('Ahoy!')
})

app.listen(PORT, () => console.log(`Server started on PORT:${PORT}`))
