const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/AyiHockWebsite'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/AyiHockWebsite/index.html'));
});


app.listen(process.env.PORT || 8000);