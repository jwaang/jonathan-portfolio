const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar: "https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg",
      email: "jonathan@gmail.com",
      name: "Jonathan",
      username: "jwaang",
      info: "Hi I'm Jon",
      password: "123456",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar: "https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg",
      email: "testtest@gmail.com",
      name: "Test Test",
      username: "testtest",
      info: "Hi I'm Test",
      password: "testtest",
    },
  ],
  portfolios: [
    {
      title: "Job in Netcentric",
      company: "Netcentric",
      companyWebsite: "www.google.com",
      location: "Spain, Barcelona",
      jobTitle: "Engineer",
      description: "Doing something, programing....",
      startDate: "01/01/2014",
      endDate: "01/01/2016",
      user: user1Id,
    },
    {
      title: "Job in Siemens",
      company: "Siemens",
      companyWebsite: "www.google.com",
      location: "Slovakia, Kosice",
      jobTitle: "Software Engineer",
      description: "Responsoble for parsing framework for JSON medical data.",
      startDate: "01/01/2011",
      endDate: "01/01/2013",
      user: user1Id,
    },
    {
      title: "Work in USA",
      company: "WhoKnows",
      companyWebsite: "www.google.com",
      location: "USA, Montana",
      jobTitle: "Housekeeping",
      description: "So much responsibility....Overloaaaaaad",
      startDate: "01/01/2010",
      endDate: "01/01/2011",
      user: user2Id,
    },
  ],
};

module.exports = data;
