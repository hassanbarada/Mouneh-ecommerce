const mongoose = require("mongoose");
const User = require("./user");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Mouneh", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Clear duplicate data
async function dropLastnameIndex() {
  try {
    await User.collection.dropIndex("firstname_1");
    console.log("username index dropped");
  } catch (error) {
    console.error("Error dropping lastname index:", error);
  } finally {
    mongoose.disconnect();
  }
}

// Call the function to drop the index
dropLastnameIndex();
