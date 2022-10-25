'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

module.exports.hello = async (event) => {
  try {
    
    const queryParams = event.queryStringParameters || {};
    const params = {
      Destination: {
        ToAddresses: ['example@example.com'],
      },
      Message: {
        Body: {
          Text: {
            Data: 'this is a test email',
          },
        },
        Subject: {
          Data: 'Test Email',
        },
      },
      Source: 'example@example.com', // This can be any email address, the email you want to show as the "sender" when the email is received
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
