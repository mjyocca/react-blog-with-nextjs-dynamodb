import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

const config: DynamoDBClientConfig = {
  region: process.env['AWS_REGION'] || 'us-east-1',
  credentials: {
    accessKeyId: process.env['AWS_ACCESS_KEY'] || '[fake]',
    secretAccessKey: process.env['AWS_SECRET_KEY'] || '[fake]',
  },
};

if (!process.env['AWS_ACCESS_KEY'] && !process.env['AWS_SECRET_KEY']) {
  config.endpoint = 'http://dynamodb:8000';
}

const dynamodb = new DynamoDBClient(config);

export default dynamodb;
