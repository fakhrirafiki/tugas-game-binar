const express = require('express');
const apisRoute = require('./routes/apisRoute');
const viewsRoute = require('./routes/viewsRoute');

const dotenv = require('dotenv')
dotenv.config();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// public
app.use(express.static('public'));

//setting View Engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//routing
app.use('/', viewsRoute)
app.use('/apis', apisRoute)


app.listen(process.env.PORT || 3000, () => console.log(`listenning at ${process.env.PORT || 3000}`));
