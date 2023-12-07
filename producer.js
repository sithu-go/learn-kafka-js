const { Kafka } = require("kafkajs");

// node topics.js Hello
// 0    1         2
const msg = process.argv[2]
produce();

async function produce() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        console.log("Connecting");
        await producer.connect();
        console.log("Connected");

        // Producing
        console.log("Producing data ...")

        // A-M 0, N-Z 1
        // custom partitioning
        const partition = msg[0].toUpperCase() < "N" ? 0 : 1
        const recordMetaData = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    value: msg,
                    partition,
                }
            ]
        })

        console.log(`Published Successfully! ${JSON.stringify(recordMetaData)}`)

        await producer.disconnect();

    } catch (ex) {
        console.log(`Something bad happened ${ex}`);
    } finally {
        process.exit(0)
    }
}