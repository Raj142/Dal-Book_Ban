const mongoose = require('mongoose');
const DB = "mongodb+srv://nadish123:nadish123@cluster0.8awnc.mongodb.net/dalbook?retryWrites=true&w=majority";

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then((db) => { console.log('Connected to DB..') })
.catch((err) => { console.log('Error while connecting to Db '+err); });
