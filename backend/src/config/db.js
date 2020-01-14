const mongoose = require('mongoose');
const dotenv = require('dotenv');
const db = mongoose.connection;
const prod = process.env.NODE_ENV === 'prod';

dotenv.config();

mongoose.connect(prod ? process.env.DB_HOST : 'mongodb://localhost:27017/glelog', { 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});

db.once('open', () => console.log('⭕  mongodb 연결성공 !!'));
db.on('error', (e) => console.log(`❌  mongodb 연결실패, 원인: ${e}`));

module.exports = db;



