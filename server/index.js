const express = require('express')
const next = require('next')

//Database connection function
const connectDB = require('../utils/db.js')

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// .prepare => prepare the app to go to the next framework after that we will launch the server
app
  .prepare()
  .then(() => {
    //Init middleware (Body Parser , now it s included with express )

    connectDB()

    const server = express()

    server.use(express.json({ extended: false }))

    const routes = require('./routes/index.js')

    server.use('/api', routes)

    // * means , take any route
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`o< ........ your application is ready on port ${PORT} `)
    })
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })
