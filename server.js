const http = require('http');
const app = require('./app');

// const port = process.env.PORT || 3000;
const port = 5000;

const server = http.createServer(app);

server.listen(
    port,
    () => console.log(`It's alive on http://localhost:${port}`)    
);