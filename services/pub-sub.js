const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub()

module.exports = {
    publishMessage: async (topicName, payload) => {
        const dataBuffer = Buffer.from(JSON.stringify(payload))

        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer)
        console.log(`Message ${messageId} published.`)
        return messageId
    },

    listenForPullMessages: (subscriptionName,  timeout) => {
        const subscription = pubSubClient.subscription(subscriptionName)

        let messageCount = 0
        const messageHandler = message => {
            console.log(`Received message ${message.id}:`)
            console.log(`Data: ${message.data}`)
            messageCount += 1

            message.ack()
        }

        subscription.on('message', messageHandler)

        setTimeout(() => {
            subscription.removeListener('message', messageHandler)
            console.log(`${messageCount} message(s) received.`)
        }, timeout * 1000)
    },
}