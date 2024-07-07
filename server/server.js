/* eslint-disable no-undef */
const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected succesfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
