const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DB;
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully"));
// Load environment variables from.env file

const PORT = process.env.PORT || 3000;
// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Handle unhandled promise rejections
