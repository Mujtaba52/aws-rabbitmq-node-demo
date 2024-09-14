import amqplib from "amqplib";
import "dotenv/config";

let connection = null;

async function connectToRabbitMQ() {
    if (!connection) {
        try {
            const opt = {
                credentials: amqplib.credentials.plain(process.env.RABBIT_MQ_USERNAME,process.env.RABBIT_MQ_PASSWORD)
            };
            connection = await amqplib.connect(process.env.RABBIT_MQ_URL, opt);
            console.log("Connected to RabbitMQ successfully!");
        } catch (error) {
            console.error("RabbitMQ connection error:", error);
            throw error;
        }
    }
    return connection;
}

export default connectToRabbitMQ;
