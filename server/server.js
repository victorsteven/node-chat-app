const path = require('path');
const express = require('express');


//__dirname is the server folder

var app = express();

// console.log(__dirname + "/../public");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

// console.log(publicPath);
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});