const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const MongoURI = require("./config/keys").MongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

//MONGO DB CONNECTION
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo db is up and Connected!"))
  .catch((err) => console.log(err));

//ROUTES
app.use("/api/product/", require("./routes/api/product.routes"));
app.use("/api/user/", require("./routes/api/user.routes"));
app.use("/api/payment/", require("./routes/api/payment.routes"));

//serve static assets if in Production
// if (process.env.NODE_ENV === 'production') {
//set static folder
// app.use(express.static("client/build"));
app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
// }

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("App is running..."));
