const mongoose = require('mongoose');
const dotenv = require('dotenv');
const db = mongoose.connection;

dotenv.config();

mongoose.connect(process.env.DB_HOST, { 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
});

db.once('open', () => console.log('⭕  mongodb 연결성공 !!'));
db.on('error', (e) => console.log(`❌  mongodb 연결실패, 원인: ${e}`));

module.exports = db;



