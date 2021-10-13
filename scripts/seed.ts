import dynamodb from '../lib/dynamodb';
import { BatchWriteItemCommand, BatchWriteItemCommandInput } from '@aws-sdk/client-dynamodb';

const commentBody = `
Pellentesque egestas maximus leo. Sed nulla purus, pretium et dui sed, sollicitudin luctus justo. Morbi pharetra feugiat sollicitudin.
Fusce tincidunt, nisl a ornare sodales, ex metus feugiat est, sit amet gravida turpis est non lorem. Donec rutrum ultrices felis vel pharetra.
Mauris scelerisque ex arcu, et cursus justo ultrices nec. Etiam sit amet neque luctus, vestibulum lacus at, cursus nis`;

const batchInput: BatchWriteItemCommandInput = {
  RequestItems: {
    Post: [
      {
        PutRequest: {
          Item: {
            id: { S: 'nextjs-ssr' },
            title: { S: 'NextJS SSR' },
            description: { S: 'Get Started with Server Side Rendering with NextJS' },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'nextjs-ssg' },
            title: { S: 'NextJS SSG' },
            description: { S: 'Get Started with Static Site Generation with NextJS' },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'aws-dynamodb' },
            title: { S: 'AWS DynamoDB' },
            description: { S: 'Get Started with DynamoDB as your next NoSQL database' },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'swr-hooks' },
            title: { S: 'SWR React Hooks' },
            description: {
              S: 'Lightweight React Hooks library for Data Fetching with Typescript, REST, and GraphQL support',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'getting-started-with-typescript' },
            title: { S: 'Getting Started With Typescript' },
            description: {
              S: 'TypeScript is a strongly typed programming language which builds on JavaScript giving you better tooling at any scale',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'mdx-component-markdown' },
            title: { S: 'MDX Component Markdown' },
            description: {
              S: 'Write JSX in your markdown documents, great for writing a staticly generated site',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'aws-lambda' },
            title: { S: 'Getting Started Cloud Computing with AWS Lambda (serverless)' },
            description: {
              S: 'Learn how to write APIs, scheduled jobs, and event triggers with AWS Lambda',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'aws-elastic-beanstalk' },
            title: { S: 'AWS Elastic BeanStalk (PAAS)' },
            description: {
              S: 'Learn how to get started in AWS with Elastic Beanstalk and host your backend web applications',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'aws-elastic-container-service' },
            title: { S: 'AWS Elastic Container Service' },
            description: {
              S: 'Learn how to get started in AWS with Elastic Container Service to run your containers',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'aws-kinesis-data-streams' },
            title: { S: 'AWS Kinesis Data Streams' },
            description: {
              S: 'Learn how to build a real time ingestion engine with Kinesis Data Streams',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'getting-started-with-typeorm' },
            title: { S: 'Get Your ORM on with TypeORM' },
            description: {
              S: 'Learn how to build backend APIs in Typescript with TypeORM as your Object Relational Mapper',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: 'salesforce-connected-app-integration' },
            title: { S: 'Salesforce Connected Apps' },
            description: {
              S: 'Build Salesforce integration in your application with Connected Apps',
            },
            body: { S: '[]' },
            commentItems: {
              L: [
                {
                  M: {
                    body: { S: `${commentBody}` },
                    createddate: { S: `${new Date().getTime() + 1}` },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  },
};

export default async function main() {
  try {
    const data = await dynamodb.send(new BatchWriteItemCommand(batchInput));
    console.log('Seeding Data Complete', data);
  } catch (err) {
    console.error('error', err);
  }
}

module.exports = module.exports.default;
