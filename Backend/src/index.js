const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use(require('./routes/index'));

async function main()
{
    await app.listen(3001);
    console.log('Server in port 3001');
}

main();