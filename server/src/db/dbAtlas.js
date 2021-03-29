const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("Atlas DB connected!!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectDB,
};
