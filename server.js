const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');


connectDB();
const port = process.env.PORT || 3000 ;


app.listen(port , () => {
     console.log(`server is online at http://localhost:${port}`)
})