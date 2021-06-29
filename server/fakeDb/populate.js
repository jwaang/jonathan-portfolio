const mongoose = require("mongoose");
const config = require("../config/dev");
const fakeDb = require("./fakedb");
require("../database/models/portfolio");

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async () => {
    console.log("Populating db");
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log("Db populated successfully");
  }
);
