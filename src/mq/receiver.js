import connectToRabbitMQ from './rabbitMQConnectionManager.js';

async function consumeFromQueue(queue, onMessage) {
    const connection = await connectToRabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    console.log(`Waiting for messages in ${queue}.`);

    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const receivedData = JSON.parse(msg.content.toString());
            onMessage(receivedData);
            channel.ack(msg);
        }
    }, { noAck: false });
}

export { consumeFromQueue };
