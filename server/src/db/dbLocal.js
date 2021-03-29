const mongoose = require("mongoose");

const CONNECTION_URI = "localhost:27017/rozgaar";

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("Local DB Connected!!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectDB,
};
