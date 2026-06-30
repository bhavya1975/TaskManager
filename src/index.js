const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const tasksRouter = require('./tasks/tasks.router.js');
const cors = require('cors');
const responseFormatter = require('./middleware/responseFormatter.js');
const { StatusCodes } = require('http-status-codes');
const authRouter = require('./auth/auth.router.js');
const usersRouter = require('./users/users.route.js');
const app = express();           // 9..65,535 http://localhost:3001
const mongoose = require('mongoose');
const expressWinstonsMiddleware = require('./middleware/expressWinstons.middleware.js');
const dotenv = require('dotenv');
app.use(express.json());        // to parse incoming JSON data in request body

app.use(cors());               // to enable CORS for all routes

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: path.join(__dirname, '..', envFile) });

const port = parseInt(process.env.PORT) ;   
// console.log(process.env.NODE_ENV); // Output: PROD_VALUE_ENV
const corsOptions = {
    origin: ["http://localhost:3000", "http://example.com"]
};

let accessLogStream = fs.createWriteStream(
    path.join(__dirname, ".." ,"access.log"), 
    { flags: "a" }
);
// a will append to the log not replace it

app.use(responseFormatter);    // to format the response in a consistent way
app.use(morgan('combined', { stream: accessLogStream}))
app.use(expressWinstonsMiddleware);  // to log HTTP requests using winston


app.use("/",tasksRouter);
app.use("/auth",authRouter);
app.use("/users",usersRouter);

const middleWare = (req,res,next)=>{
    req.info = {
        appName : "Task Manager",
        author : "cloudaffle"
    };
    next();
}

// define routes
app.use(middleWare);

// after all middleware ad before listen

app.use((req,res)=>{
    res.status(StatusCodes.NOT_FOUND).json(null);
});

async function bootstrap(){
    try{
        await mongoose.connect(process.env.DATABASE_URL,
            {dbName: process.env.DATABASE_NAME}
        );
        console.log("Connected to MongoDB");
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(error){
        console.error("Error connecting to MongoDB",error);
        process.exit(1);
    }
}

bootstrap();

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// });

