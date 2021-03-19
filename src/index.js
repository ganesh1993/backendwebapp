const express             = require('express');
const logger              = require('morgan');
const pe                  = require('parse-error');
const cors                = require('cors');
const app                 = express();
const CONFIG  = require('./config/config');
const models = require("./models/model");
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
// Log requests to the console.
app.use(logger('dev'));


//Log Env

console.log("Environment:", CONFIG.env);

//DATABASE
models.sequelize.authenticate()
 .then(() => {
        console.log('Connected to SQL database:', CONFIG.db_name);
        console.log('!!!',CONFIG.env);
    }).catch(err => {
        console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
    });
//if (CONFIG.env === 'development' && CONFIG.db_sync === true) {
if (CONFIG.env === 'development') {
    models.sequelize.sync({force: false}); //deletes all tables then recreates them
}

// CORS
app.use(cors());

// Require routes into the application.
require('./routes/routes')(app);

app.get('/', (req, res) => {
    let start = new Date();
    res.status(200).send({
    message: 'Welcome to the Simple Banking API!',
    time: new Date().getTime() - start
    })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// general error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({success: false, error: err.message});
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
console.error('Uncaught Error', pe(error));
});
 

const port = parseInt(CONFIG.port, 10) || 5000;
app.listen(port, () => {  
});


