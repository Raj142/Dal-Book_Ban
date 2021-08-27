var express = require('express');
const route = require('./routes/routes');
require('./DBConfig');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
})
app.use('/', route)
app.listen(4000, () => {
    console.log('App listening on port 4000..');
})