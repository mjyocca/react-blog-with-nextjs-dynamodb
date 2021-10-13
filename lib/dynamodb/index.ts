import type { PostEntity, DynamoPostEntity } from './postTable';
import dynamodb from './dynamodb-client';
import { createPost, getPosts } from './postTable';

export type { PostEntity, DynamoPostEntity };

export { createPost, getPosts };

export default dynamodb;
