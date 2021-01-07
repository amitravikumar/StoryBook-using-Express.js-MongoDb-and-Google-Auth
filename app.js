const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const { set } = require('mongoose');
//Load config
dotenv.config({ path: './config/config.env'})

connectDB()

const app = express();

//Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Express Handlebars engine setup
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

//Static Files
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`The application is running in ${process.env.NODE_ENV} on port ${PORT}`))