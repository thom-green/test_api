require('dotenv').config();

const express = require ('express');
const mongoose = require('mongoose'); //import mongoose
const routes = require('./routes/tea'); // import the routes
const helmet = require('helmet');
const compression = require('compression');

//establish connection to database
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  },
  function (err) {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);


const app = express();

app.use(helmet());
app.use(compression()); //Compress all routes
app.use(express.json());

app.use('/', routes); //to use the routes
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});
app.use('/uploads', express.static('./uploads'));

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
