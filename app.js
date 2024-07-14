const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser');

const referalRoute = require('./routes/referal-route');
const userRoute = require('./routes/user-route');
const authenticate = require("./middleware/authenticate");

const getPrismaClient = require('./client');
const app  = express();
require('dotenv').config();

const middleware = (req, res, next) => { 
    const path = req.path;
    const method = req.method;
    const time = new Date().toISOString();
    console.log(`${time} - ${method} - ${path}`);
    next();
  }

app.use(cors({origin: ['https://accredian-frontend-task-plum.vercel.app', 'http://localhost:5173'], credentials: true}))
app.use(express.json());
app.use(cookieParser("SECRET"));
app.use(middleware);


app.use('/referal', authenticate,  referalRoute);
app.get('/test', async (req, res) => {
  const prisma = getPrismaClient();
  const data = await prisma.user.findMany();
  res.status(200).json({data})
})
app.use('/user', userRoute)

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})

