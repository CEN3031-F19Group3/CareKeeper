const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    patientsRouter = require('../routes/patients.server.routes'),
    managersRouter = require('../routes/managers.server.routes'),
    caregiversRouter = require('../routes/caregivers.server.routes'),
    visitsRouter = require('../routes/visits.server.routes'),
		cors = require('cors');


module.exports.init = () => {
    /*
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

		app.use(cors());

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/api/patients', patientsRouter);
    app.use('/api/managers', managersRouter);
    app.use('/api/caregivers', caregiversRouter);
    app.use('/api/visits', visitsRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}