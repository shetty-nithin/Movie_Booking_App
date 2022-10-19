const notificationConfig = require("../configs/notification.config");
const Client = require("node-rest-client").Client;
const client = new Client();

module.exports = (subject, content, recipient, requester) => {
    const reqBody = {
        subject : subject,
        content : content,
        recepientEmails : recipient,
        requester : requester
    }
    const reqHeader = {
        "Content-Type": "application/json"
    }
    const args = {
        data: reqBody,
        headers: reqHeader
    }
    
    try {
        client.post("http://localhost:7777/notiserve/api/v1/notifications", args, (data, res) => {
            console.log("notification sent!");
            console.log(data);
        })
    }
    catch (err) {
        return res.status(500).send({
            message : "Internal server error."
        })
    }
}