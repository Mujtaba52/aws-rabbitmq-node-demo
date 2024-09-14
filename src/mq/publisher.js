import connectToRabbitMQ from './rabbitMQConnectionManager.js';
import { v4 as uuidv4 } from 'uuid';

async function publishToQueue(queue, payload) {
    try {
        const connection = await connectToRabbitMQ();
        const channel = await connection.createChannel();
        await channel.assertQueue(queue);
        const correlationId = uuidv4();
        payload.correlationId = correlationId
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
        console.log(`Sent '${JSON.stringify(payload)}' to ${queue} with correlationID ${correlationId}`);
        await channel.close();
        return correlationId
    } catch (error) {
        console.error("RabbitMQ publish error:", error);
        throw error;
    }
}

export { publishToQueue };


/*
        const message = {
            action,
            document_id: documentId
        };

        also remember to JSON.stringify when passing into Buffer.from()
*/