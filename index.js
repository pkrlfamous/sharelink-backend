const express = require('express');
const app = express();

require('./src/config/dbConfig')();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to ${port}`);
})