require("dotenv").config({path: "./config.env"});
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(require("./routes/main"));


const port = process.env.PORT || 5000;

const dbo = require("./db/conn");

app.listen(port, ()=> {
    dbo.connectToServer(function(err){
        if (err) console.error(err);
    });
    console.log(`Server is running on ${port}`);
})