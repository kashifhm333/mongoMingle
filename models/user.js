const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mongoMingle");

const userSchema = mongoose.Schema({
name: String,
email: String,
image : String
})


module.exports = mongoose.model("User", userSchema);