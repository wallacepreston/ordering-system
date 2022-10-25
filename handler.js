'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' });

module.exports.hello = async (event) => {
  const queryParams = event.queryStringParameters || {};
  const params = {
    Destination: {
      ToAddresses: [queryParams.email],
    },
    Message: {
      Body: {
        Text: {
          Data: queryParams.message,
        },
      },
      Subject: {
        Data: queryParams.subject,
      },
    },
    Source: 'example@example.com', // This can be any email address, the email you want to show as the "sender" when the email is received
  };
  await ses.sendEmail(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Email sent to ${queryParams.email}`,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
