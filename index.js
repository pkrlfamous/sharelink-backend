const express = require('express');
const app = express();

app.use(express.json());

require('./src/config/dbConfig')();

app.use('/api/v1', require('./src/routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to ${port}`);
})
