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

## Example
Here's a payload:

![](https://user-images.githubusercontent.com/1598537/156059031-6867ad7c-24f4-46da-95fc-489f3fb01a3f.png)

Successful delivery to the DLQ:

![](https://user-images.githubusercontent.com/1598537/156059133-1acb2bb7-d832-4b19-abd7-e81bd3ef2ed9.png)

The full message in the DLQ:

![](https://user-images.githubusercontent.com/1598537/156059188-08517989-956a-4a26-aa32-e8ec862bd313.png)

But no message in the Filter Policy queue:

![](https://user-images.githubusercontent.com/1598537/156059279-63c4567d-1c8e-4942-95ec-8544d6e627fc.png)
