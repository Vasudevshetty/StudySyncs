const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connected succesfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err.message);
  });
