const mongoose = require('mongoose');
const db = mongoose.connection;
const prod = process.env.NODE_ENV === 'prod';

mongoose.connect(prod ? process.env.DB_HOST : process.env.DB_TEST, { 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});

db.once('open', () => console.log('⭕  mongodb 연결성공 !!'));
db.on('error', (e) => console.log(`❌  mongodb 연결실패, 원인: ${e}`));

module.exports = db;



