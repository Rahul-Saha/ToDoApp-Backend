const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8080;
// const port = 5000;

const uri = process.env.MONGODB_URI;

const server = http.createServer(app);

server.listen(
    port,
    () => console.log(`It's alive on http://localhost:${port}`)    
);