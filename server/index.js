import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './mongodb.js';
import userRouter from './router/user.js';
import taskRouter from './router/task.js';

dotenv.config();
dbConnection();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/user', userRouter);
app.use('/tasks', taskRouter);

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running"
    }); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app