const { server_boot } = require('./app');
server_boot();

console.log(`server on ${new Date().toString()} port 3000`);