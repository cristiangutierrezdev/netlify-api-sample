const express = require('express')
const app = express()
const PORT = process.PORT || 3000
const routes = require('./routes')
const cors = require('cors');

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
  console.log('Server on port ' + PORT)
})
