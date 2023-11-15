
import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from "./routes/jobsRoutes.js";
//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/Auth.js'

//middlewares

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.use(express.json())

const port =  5000

app.get('/', (req, res) => {
    res.json({ msg: 'hello' })
})
app.get("/api/v1", (req, res) => {
  res.json({ msg: "WELCOME" });
});
     
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('connected to database');
        
        app.listen(port, () => {
            console.log(`server is listening on port ${port}... `);
        })
    } catch (error) {
        console.log(error);
    }
}

start();

