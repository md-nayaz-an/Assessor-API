const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./connect');
const { videoRouter } = require('./videoRoutes');
const { questionRouter } = require('./questionRoutes');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(videoRouter);
app.use(questionRouter);

app.listen(port, async() => {
    connectToDatabase();
    console.log(`Server started at port: ${port}`);
});
