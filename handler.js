'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

module.exports.sendEmail = async (event) => {
  try {
    const queryParams = event.queryStringParameters || {};

    // select from the query parameters or use the default values
    const {
      email = 'example@example.com',
      message = 'This message is from the Notification Service',
      subject = 'Message from the Notification Service',
    } = queryParams;

    // build params object to pass to the sendEmail function
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: message,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: 'wallace.preston@gmail.com', // The email you want to show as the "sender" when the email is received.  This must be added as an identity via the AWS SES console and verified.
    };

    // send the email
    await ses.sendEmail(params).promise();

    // response to the client that made the request
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Email sent to ${email}`,
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
  }
};
