const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/MERN_Stack")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

module.exports = mongoose;
