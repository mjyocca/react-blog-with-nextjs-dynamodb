import dynamodb from '../lib/dynamodb';
import { CreateTableCommand, CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

export default async function createPostTable() {
  const params: CreateTableCommandInput = {
    TableName: 'Post',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST',
    StreamSpecification: {
      StreamEnabled: false,
    },
  };
  return dynamodb.send(new CreateTableCommand(params));
}

module.exports = module.exports.default;
