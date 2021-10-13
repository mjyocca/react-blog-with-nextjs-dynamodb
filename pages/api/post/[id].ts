import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostEntity } from '@/lib/dynamodb';
import { deletePost, getPostById, updatePost } from '@/lib/dynamodb/postTable';

async function GetHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const post = await getPostById(id as string);
  if (!post) throw Error;
  return res.status(200).json(post);
}

async function DeleteHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body,
    query: { id },
  } = req;
  let postItem = JSON.parse(body);
  if (!postItem.slug) {
    postItem = { slug: id };
  }
  const result = await deletePost(postItem);
  return res.status(200).json(result);
}

async function PatchHandler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const postItem = JSON.parse(body);
  const updatedPostResult = await updatePost(postItem);
  console.log({ updatedPostResult });
  return res.status(200).json(updatedPostResult);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostEntity | string | any>) {
  try {
    const { method } = req;
    switch (method) {
      case 'GET':
        return GetHandler(req, res);
      case 'PATCH':
        return PatchHandler(req, res);
      case 'DELETE':
        return DeleteHandler(req, res);
      default:
        return res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('error, ' + JSON.stringify(err));
  }
}
