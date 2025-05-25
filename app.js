const express = require('express');
const app = express()
const port = process.env.PORT || 3001
const mongoose = require('mongoose');
const allRoutes = require('./routes/allRoutes');
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
var methodOverride = require("method-override");
app.use(methodOverride("_method"))

// Start of live reload code

// const path = require("path");
// const livereload = require("livereload");
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));


// const connectLivereload = require("connect-livereload");
// app.use(connectLivereload());

// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

// End of live reload code

// Connection of database
mongoose
  .connect("mongodb+srv://learningDatabse:ZEfnsaXJtWgwGSB3@adamlearningcluster.tkbqyyq.mongodb.net/all-data?retryWrites=true&w=majority&appName=adamlearningcluster")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    })
  })
  .catch((err) => { console.log(err) });

app.use(allRoutes)