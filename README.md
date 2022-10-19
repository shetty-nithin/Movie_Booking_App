# Movie Booking Application

[![LinkedIn][linkedin-shield]][linkedin-url]


<br/>

## About The Project
This is a simple movie ticket booking application.

<br/>

### Moto & Credits :     
* This application is made as a one of the final project for Bakend Development course by [Relevel](https://relevel.com/home) guided by [Vishwa Mohan](https://www.linkedin.com/in/vishwa-mohan).

<br/>

### Features : 
* Sign up / Sign in 
  <br/> A user can create an account as a CUSTOMER or as a THEATRE_OWNER and sign into the account to use the application.

* Create, Read, Update and Delete operations on users, movies, theatres and booking.

* Admin feature
<br/> Has access to all the operation which a user or a theatre_owner can perform.

* Notification via mail 
<br/> Sending the mail notification to the user on booking the ticket <br/>  (however, Notification is a different project. You can find that [here](https://github.com/shetty-nithin/Mail_Notification_Application))

<br/>

### Built with : 

* [![MongoDB][MongoDB]][MongoDB-url]

* [![Express.js][Express.js]][Express-url]

* [![Node.js][Node.js]][Node-url]

<br/>
<br/>

## Installation
<br/>

__Installation & Initial Configuration of Movie__Booking_App__
<br/>

1. Run the following command in the terminal to clone the repository
   ```sh
   git clone https://github.com/shetty-nithin/Movie_Booking_App.git
   ```

2. Go inside the root folder

3. Install NPM packages
   ```
   npm install
   ```

4. If you are not integrating the Notification feature, then comment out the notification_app related lines of code.
   ```javascript
    mailTypes.bookingTimedOut(req.user.email);
    // from bookTicket function of "controller/booking.controller.js"

    if(updatedBooking.status === constants.bookingStatus.cancelled){
        mailTypes.bookingCancelled(req.user.email)
    }
    // from updateBooking function of "controller/booking.controller.js"


    mailTypes.paymentSuccessfull(req.user.email, paymentPaid);
    mailTypes.paymentFailed(req.user.email, paymentPaid);
    // from createPayment function of "controller/paryment.controller.js"

    delete "configs/notification.config.js" file.
    delete "utils/mailTypes.js" file.
    delete "utils/notificationClient.js" file.
   ``` 

5. Inside the root folder create one more file with name ".env" and mention the port as below
   ```javascript
    PORT = 8080
    DB_URI = mongodb://localhost:27017/mba
    SECRET_KEY = "sdfhasdfkwe$640kjf"
    ACCESS_TOKEN_TIME = 120
    BOOKING_APP_URL = "http://localhost:8080"
   ```

6. Run the server
   ```javascript
   npm start
   ```
<br/>
<br/>

__Installation & Initial Configuration of Mail_Notification_App__
<br/>

1. Come out of the Movie_Booking_App root folder.

2. Run the following command in the terminal to clone the repository
   ```sh
   git clone https://github.com/shetty-nithin/Mail_Notification_Application.git
   ```
   
3. Go inside the Mail_Notification_App root folder

4. Install NPM packages
   ```
   npm install
   ```

5. Inside the root folder create one more file with name ".env" and mention the port as below
   ```javascript
   PORT = 7777
   ```

6. Inside the ".env" file of Movie_Booking_App include the notifcation api address as below 
   ```javascript
   NOTIFICATION_REST_URL = "http://localhost:7777/notiserve/api/v1/notifications"
   ```

7. Uncomment the notification_app related lines of code.
    ```javascript
    mailTypes.bookingTimedOut(req.user.email);
    // from bookTicket function of "controller/booking.controller.js"

    if(updatedBooking.status === constants.bookingStatus.cancelled){
        mailTypes.bookingCancelled(req.user.email)
    }
    // from updateBooking function of "controller/booking.controller.js"


    mailTypes.paymentSuccessfull(req.user.email, paymentPaid);
    mailTypes.paymentFailed(req.user.email, paymentPaid);
    // from createPayment function of "controller/paryment.controller.js"
    ``` 

8. Inside the configs folder create one more file with name "notification.config.js" and write the below code inside it.
    ```javascript
    if(process.env.NODE_ENv !== "production"){
    require("dotenv").config();
    }

    module.export = {
        NOTIFICATION_URL: process.env.NOTIFICATION_REST_URL
    }
    ```

9. Inside the utils folder create one more file with the name "mailTypes.js" and write the below code inside it.
    ```javascript
    const sendNotificationReq = require("./notificationClient");
    const serverConfig = require("../configs/server.config");

    exports.paymentSuccessfull = (recievers, payment) =>{
        sendNotificationReq(
            "Ticket booked successfully!", 
            recievers, 
            `Rs ${payment.amount} has been deducted from your bank account towards booking movie tickets.`,
            "Movie_Booking_App"
        );
    }

    exports.paymentFailed = (recievers, payment) => {
        sendNotificationReq(
            "Payment failed. Please try again.",
            recievers,
            `Payment of Rs ${payment.amount} has failed. Please click here ${serverConfig.BOOKING_APP_URL}/mba/api/v1/bookings to book again`,
            "Movie_Booking_App"
        );
    }

    exports.bookingCancelled = (recievers) => {
        sendNotificationReq(
            "Booking Cancelled.",
            recievers,
            `Your booking has been cancelled. Click here ${serverConfig.BOOKING_APP_URL}/mba/api/v1/bookings to book again`,
            "Movie_Booking_App"
        );
    }

    exports.bookingTimedOut = (recievers) => {
        sendNotificationReq(
            "Booking Timed out.",
            recievers,
            `Booking cancelled because due to delay in payment. Click here ${serverConfig.BOOKING_APP_URL}/mba/api/v1/bookings to book again.`,
            "Movie_Booking_App"
        );
    }
    ```

10. Inside the utils folder create one more file with the name "notificationClient.js" and write the below code inside it.
    ```javascript
    const notificationConfig = require("../configs/notification.config");
    const Client = require("node-rest-client").Client;
    const client = new Client();


    module.exports = (subject, content, recipient, requester) => {
        const reqBody = {
            subject: subject,
            content: content,
            recipient: recipient,
            requester: requester
        }
        const reqHeader = {
            "Content-Type": "application/json"
        }
        const args = {
            data: reqBody,
            headers: reqHeader
        }
        
        try {
            client.post(notificationConfig.NOTIFICATION_URL, args, (data, res) => {
                console.log("notification sent!");
            })
        }
        catch (err) {
            return res.status(500).send({
                message : "Internal server error."
            })
        }
    }
    ```
    
11. Run the server
    ```javascript
    node server.js
    ```

<br/>
<br/>

## Demo
#### SignUp and SignIn <br/><br/>
https://user-images.githubusercontent.com/62413993/196036125-7e9d2731-0d6e-4b9b-8be1-4e9b2ba3e49e.mp4

#### Ticket <br/><br/>
https://user-images.githubusercontent.com/62413993/196036140-64ba2242-f7b4-4670-8e56-18380342ac0e.mp4

#### Admin Operations <br/><br/>
https://user-images.githubusercontent.com/62413993/196036164-a2e3f474-b18b-4c21-8f8d-83a4a4fb4663.mp4


<!-- MARKDOWN LINKS -->
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members

[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0072b1
[linkedin-url]: https://www.linkedin.com/in/shetty-nithin/

[MongoDB]: https://img.shields.io/badge/MongoDB-589636?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[Node.js]: https://img.shields.io/badge/Node.js-215732?style=for-the-badge&logo=nodedotjs&logoColor=61DAFB
[Node-url]: https://nodejs.org/en/

[Express.js]: https://img.shields.io/badge/Express.js-D1D3D4?style=for-the-badge&logo=express&logoColor=4FC08D
[Express-url]: https://expressjs.com/
