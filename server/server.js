const express   = require('express'),
        bps     = require('body-parser'),
        morgan  = require('morgan'),
        cors    = require('cors'),
        api     = require('../api/api/api'),
        path    = require('path'),
        app     = express();
        // require('dotenv').config()
        // cron    = require('node-cron');
        
require('../api/api/mailer')

app.use(bps.json());
app.use(bps.urlencoded({ extended: true}));

app.use(morgan('dev'));
app.use(cors());

app.use('/api', api)

if(process.env.NODE_ENV == 'production') {
        app.use(express.static(path.resolve(__dirname, '../api/public')))
        console.log('Here')
        console.log(path.resolve(__dirname, '../api/public'))
        
        app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '../api/public/index.html')))
}

app.use((req, res, next) => {
        return res.status(404).json({
                message: "Page not found!",
        })
})

app.use((err, req, res, next) => {
        console.log(err)
        return res.status(500).json({err})
})

// Handle Production 




module.exports = app;
