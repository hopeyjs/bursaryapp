const mongoose = require('mongoose');

exports.connectDB = async () => {
    await mongoose.connect(`${process.env.DBHost}/${process.env.DBName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
    },
      console.log('DB Connection Successful!'));
}
