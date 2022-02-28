# SNS Filter Issue

TL;DR - A properly formatted JSON string sent as a String value in a Message Attribute field will not pass a filter policy checking for existence of the attribute.

## Summary

This repository creates a function (and execution role), SNS topic, two queues, and two subscriptions - one with a Filter Policy applied, and one without.
The filter policy merely checks for the existence of the `_datadog` attribute.

POSTing to the provided endpoint sends a message the the topic, which includes a JSON encoded string (`trace-context`) passed as a StringValue inside the Message Attributes.

### Expected result:

The message is delivered to both queues

### Actual result:

The message is only delivered to the DLQ, and not the queue with the applied filter policy.

You can read more [here](https://docs.google.com/document/d/1H49O6H-OQLH8PdtrzGq951KJ6UJrK40DWvt8lqM4PpQ/edit#)

## Deploying

Install `serverless` with `npm i -g serverless`.
Ensure AWS credentials are available in your shell, then run `serverless deploy`.

This project has no dependencies.
