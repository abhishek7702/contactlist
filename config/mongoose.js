//require mongoose
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting to the db'));

db.once('open',function(){
    console.log('connected to the server');
})

