const mongoose = require('mongoose')

const db =
  'mongodb+srv://firas:azerty@cluster0.bxz1qwm.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    console.log('Trying to connect to MongoDb please wait ...')
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected ...')
  } catch (error) {
    console.log(error.message)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
