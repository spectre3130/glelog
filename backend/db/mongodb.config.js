const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/glog')
		.then(() => console.log("connected to mongodb server"))
		.catch((e) => console.log(e))




