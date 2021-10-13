import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
  GetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import type {
  AttributeValue,
  UpdateItemCommandInput,
  ScanCommandInput,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import dynamodb from './dynamodb-client';

const tableName = `Post`;

export type PostEntity = {
  slug: string;
  title: string;
  body: string;
  description: string;
  commentItems: CommentEntity[];
};

export type CommentEntity = {
  body: string;
  createddate: string;
};

export type DynamoPostEntity = {
  id: AttributeValue;
  body: AttributeValue;
  title: AttributeValue;
  description: AttributeValue;
  commentItems: { L: AttributeValue[] };
  [key: string]: AttributeValue;
};

const getPostEntity = ({ id, title, description, body, commentItems }: DynamoPostEntity): PostEntity => {
  const post: Partial<PostEntity> = {};
  post.slug = id.S;
  post.title = title.S;
  post.description = description.S;
  post.body = body.S;
  post.commentItems = getCommentEntity(commentItems?.L);
  return post as PostEntity;
};

const getCommentEntity = (comments: AttributeValue[]): CommentEntity[] => {
  if (!comments) return [];
  return comments.map((comment) => {
    return {
      body: comment?.M?.body.S || '',
      createddate: comment?.M?.createddate.S || '',
    };
  });
};

export async function createPost(data: PostEntity) {
  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: {
      id: { S: data.slug },
      title: { S: data.title },
      description: { S: data.description },
      body: { S: data.body },
    },
  };
  return dynamodb.send(new PutItemCommand(params));
}

export async function updatePost(data: PostEntity) {
  const params: UpdateItemCommandInput = {
    TableName: tableName,
    Key: {
      id: { S: data.slug },
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: `set title = :t, description= :d, body = :b, commentItems = :c`,
    ExpressionAttributeValues: {
      ':t': { S: data.title },
      ':d': { S: data.description },
      ':b': { S: data.body },
      ':c': {
        L:
          data.commentItems?.map((item) => {
            return {
              M: {
                body: { S: item.body },
                createddate: { S: item.createddate },
              },
            };
          }) || [],
      },
    },
  };

  return dynamodb.send(new UpdateItemCommand(params));
}

export async function deletePost(data: PostEntity) {
  const params = {
    TableName: tableName,
    Key: {
      id: { S: data.slug },
    },
  };
  return dynamodb.send(new DeleteItemCommand(params));
}

export async function getPostById(id: string) {
  const params: GetItemCommandInput = {
    TableName: tableName,
    Key: {
      id: { S: id },
    },
    ProjectionExpression: `id, title, description, commentItems, body`,
  };
  const { Item } = await dynamodb.send(new GetItemCommand(params));
  if (!Item) return null;
  return getPostEntity(Item as DynamoPostEntity);
}

export async function getPosts(options?: { limit?: number; startkey?: string }) {
  const { limit, startkey } = options || {};
  const params: ScanCommandInput = {
    TableName: tableName,
    ConsistentRead: false,
    ProjectionExpression: `id, title, description, commentItems, body`,
  };
  if (limit) {
    params.Limit = limit;
  }
  if (startkey) {
    params.ExclusiveStartKey = {
      id: { S: startkey },
    };
  }
  const ScanResponse = await dynamodb.send(new ScanCommand(params));
  const { Items, LastEvaluatedKey } = ScanResponse;
  return {
    posts: Items?.map((item) => getPostEntity(item as DynamoPostEntity)),
    nextCursor: LastEvaluatedKey?.id?.['S'],
    prevCursor: startkey || '',
  };
}
