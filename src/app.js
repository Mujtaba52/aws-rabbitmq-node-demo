import express from 'express';
import "dotenv/config";
import taskRouter from "./routes/task.route.js";
import { consumeFromQueue } from './mq/receiver.js';

const app = express();
app.use(express.json()); 
app.use('/api',taskRouter)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    consumeFromQueue('task_queue', (receivedData) => {
        console.log('Received message:', receivedData);

        // You can add any additional processing logic for received messages here
    });
});