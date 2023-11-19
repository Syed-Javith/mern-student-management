const cors = require('cors');

const CorsOptions = {
    allowedHeaders : [ 'Content-type' , 'Authorization' ],
    credentials : true ,
    methods : ['GET' , 'POST' , 'PUT' , 'PATCH' , "DELETE"],
    origin : ['http://localhost:3000']
};

const corsMiddleware = cors(CorsOptions)

module.exports = corsMiddleware
