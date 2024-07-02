const dotenv = require("dotenv");
const mongoose = require("mongoose");

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
