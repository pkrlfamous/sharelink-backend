const express = require('express');
const app = express();

app.use(express.json());

require('./src/config/dbConfig')();

app.use('/api/v1', require('./src/routes'));


app.use('*', (req, res, next)=>{
    res.status(404).json({
        'status':'fail',
        'message':`Can't find ${req.originalUrl} on this server`
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to ${port}`);
})
