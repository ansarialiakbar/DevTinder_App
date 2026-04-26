const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(cookieParser());
app.use(express.json());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/user') 

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

connectDB().then (() => {
    console.log("Databse Connected Successfully");
    app.listen(3001, () => {
    console.log("server is running successfully", 3001);  
})
}) .catch((err) => {
    console.error("Databse Connection Failed", err);
});
