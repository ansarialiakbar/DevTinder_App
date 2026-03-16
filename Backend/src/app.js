const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/user') 

app.use(cookieParser());
app.use(express.json());

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

connectDB().then (() => {
    console.log("Databse Connected Successfully");
    app.listen(3001, () => {
    console.log("server is running successfully");  
})
}) .catch((err) => {
    console.error("Databse Connection Failed", err);
});
