// utils/alertSender.js
const AWS = require("aws-sdk");
const sns = new AWS.SNS();

const TOPIC_ARN = "arn:aws:sns:eu-north-1:131676642632:WeatherAlerts-2"; 
// ^ Replace with your actual SNS Topic ARN

async function sendAlert(message) {
    try {
        const params = {
            Message: message,
            TopicArn: TOPIC_ARN,
        };

        const result = await sns.publish(params).promise();
        console.log("✅ Alert sent:", result);
        return result;
    } catch (error) {
        console.error("❌ Error sending alert:", error);
        throw error;
    }
}

module.exports = { sendAlert };
