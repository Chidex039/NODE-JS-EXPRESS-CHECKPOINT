import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

// time checking middleware

app.use((req, res, next) => {
  // get the time of the day
  const timeOfDay = new Date().getHours();
  // get the day of the week
  const dayOfWeek = new Date().getDay();

  // if statement to check for time and day of the week

  if (timeOfDay < 9 || timeOfDay > 17 || dayOfWeek === 0 || dayOfWeek === 6) {
    res.send("Our office is not open now");
  } else {
    next();
  }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  const homepageContent = fs.readFileSync("./public/homepage.html", "utf8");
  res.send(homepageContent);
});

app.get("/services", (req, res) => {
  const ourServices = fs.readFileSync("./public/our-services.html", "utf8");
  res.send(ourServices);
});

app.get("/contact", (req, res) => {
  const contactUs = fs.readFileSync("./public/contact-us.html", "utf8");
  res.send(contactUs);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
