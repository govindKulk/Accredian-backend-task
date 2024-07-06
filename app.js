const express = require("express");
const cors = require('cors')

const referalRoute = require('./routes/referal-route');

const app  = express();
require('dotenv').config();

const middleware = (req, res, next) => { 
    const path = req.path;
    const method = req.method;
    const time = new Date().toISOString();
    console.log(`${time} - ${method} - ${path}`);
    next();
  }

app.use(cors({origin: ['https://accredian-frontend-task-plum.vercel.app', 'http://localhost:5173']}))
app.use(express.json());
app.use(middleware);


app.use('/referal', referalRoute);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

