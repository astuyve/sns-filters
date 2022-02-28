"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.SNS_REGION });
const sns = new AWS.SNS({ apiVersion: "2012-11-05" });

module.exports.post = async (event) => {
  let body = {};
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    // pass
    body.count = 1;
  }
  const traceContext = {
    "x-datadog-trace-id": "4867668911143634472",
    "x-datadog-parent-id": "8240739347927346060",
    "x-datadog-sampling-priority": "1",
    "x-datadog-tags":
      "_dd.p.upstream_services=OGN3NXB4NzJzaS5leGVjdXRlLWFwaS5zYS1lYXN0LTEuYW1hem9uYXdzLmNvbQ==|1|0|1",
  };
  await sns
    .publish({
      Message: JSON.stringify(body),
      MessageAttributes: {
        _datadog: {
          DataType: 'String',
          StringValue: JSON.stringify(traceContext)
        }
      },
      TopicArn: process.env.TOPIC_ARN,
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
};