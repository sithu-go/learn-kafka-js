const { Kafka } = require("kafkajs");
run();

async function run() {
    try {
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ['localhost:9092']
        });

        const admin = kafka.admin()
        console.log("Connecting....");
        await admin.connect();
        console.log("Connected");

        // A-M, N-Z
        // await admin.createTopics({
        //     "topics": [
        //         {
        //             topic: "Users",
        //             "numPartitions": 2
        //         }
        //     ]
        // })

        // console.log("Created Successfully");

        // Deleting Topic

        // await admin.deleteTopicRecords()
        // await admin.deleteTopics({
        //     topics: ["Users"]
        // })
        // let topics = await admin.listTopics()
        // console.log(topics);



        // const groups = await admin.listGroups()
        // console.log(groups);

        // const partitons = await admin.listPartitionReassignments({
        //     "topics" : [
        //         {"topic": "Users", "partitions": 2}
        //     ]
        // })
        // console.log(partitons);

        await admin.disconnect();
    } catch (ex) {
        console.error`Something bad happend ${ex}`
    } finally {
        process.exit(0)
    }
}
