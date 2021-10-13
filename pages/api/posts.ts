import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostEntity } from '@/lib/dynamodb';
import { getPosts, createPost } from '@/lib/dynamodb';

async function PostHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const newPost = JSON.parse(body);
  const result = await createPost(newPost);
  return res.status(200).json(result);
}

async function GetHandler({ query }: NextApiRequest, res: NextApiResponse) {
  const { limit, startkey } = query;
  const opts: { limit?: number; startkey?: string } = {};
  if (limit && !Array.isArray(limit)) {
    opts.limit = parseInt(limit);
  }
  if (startkey && startkey !== 'undefined') opts.startkey = startkey as string;
  const posts = await getPosts(opts);
  if (posts) {
    return res.status(200).json(posts);
  }
  return res.status(400).json({ error: `cant find them` });
}

async function handler(req: NextApiRequest, res: NextApiResponse<PostEntity[] | { error: string } | string>) {
  const { method } = req;
  switch (method) {
    case 'GET':
      return GetHandler(req, res);
    case 'POST':
      return PostHandler(req, res);
    default:
      return res.status(302).send('idk what you want');
  }
}

export default handler;
