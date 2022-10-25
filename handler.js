'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

module.exports.hello = async (event) => {
  try {
    const queryParams = event.queryStringParameters || {};
    const params = {
      Destination: {
        ToAddresses: ['wallace.preston@gmail.com'], // the email address you want to send to
      },
      Message: {
        Body: {
          Text: {
            Data: 'This is a test email.',
          },
        },
        Subject: {
          Data: 'Test Email',
        },
      },
      Source: 'wallace.preston@gmail.com', // The email you want to show as the "sender" when the email is received.  This must be added as an identity via the AWS SES console and verified.
    };
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Email sent to example@example.com`,
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return error;
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
