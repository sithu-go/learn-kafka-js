const { Kafka } = require("kafkajs");

consume()

async function consume() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        const consumer = kafka.consumer({
            "groupId": "G1",
        })

        console.log("Connecting");
        await consumer.connect()
        console.log("Connected");

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        // Consumer should be Long polling. Keep polling for messages
        await consumer.run({
            // { topic, partition, message, heartbeat, pause }
            eachMessage: async (data) => {
                console.log(`Received Messages : ${data.message.value.toString()} on partition ${data.partition} at Offset ${data.message.offset}`);
            }
            // eachMessage: async data => {
            //     console.log({ ...data });
            // }
        })

    } catch (ex) {
        console.log(`Something bad happened ${ex}`);
    } finally {
        // process.exit(0)
    }
}