import { publishToQueue } from '../mq/publisher.js';


const createTask = async (req,res)=>{

    const payload ={
        id: "dummy_id",
        action: req.action,
        status : "inProgress"
    }
    const correlationId = await publishToQueue('task_queue', payload);
    console.log("Message sent, correlationId: ", correlationId);

    //you can store this correlationId and status of the action as inProgress in the database
    // and you receive the final status of the action with the correlationId, then you can update the status of the action

    return res.json({
         id: "dummy_id",
        status: "inProgress"
    });
}

export { createTask }