const mongoose = require('mongoose');
let dbURI = 'mongodb://castonkr:cookbook1@ds243055.mlab.com:43055/cookbookdb';

mongoose.connect(dbURI, { useMongoClient: true });

