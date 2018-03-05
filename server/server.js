const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const socket = require('./socket');

const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const dbConfig = require('./configs/db').dbaseConfig;
const routes = require('./routes');
const passportConfig = require('./configs/passport');
const io = require('socket.io')(http);

const auth = require('./configs/passport')();

mongoose.connect(dbConfig.url);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/dist'));
app.use(morgan('dev'));
app.use(auth.initialize());
routes(app, io);
passportConfig(passport);
socket(io);






http.listen(port, () => {
    console.log('Server is up to run');
});



