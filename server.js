const express = require('express');
const cors = require('cors');
const path = require('path');


const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

//API Routes
app.use('/api',require('./api'));

//Frontend Routes
app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
});