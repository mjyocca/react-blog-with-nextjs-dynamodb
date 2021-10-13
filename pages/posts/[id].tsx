import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Loading } from '@geist-ui/react';
import PostLayout from '@/components/post';
import type { PostEntity } from '@/lib/dynamodb';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<PostEntity>(() => (id ? `/api/post/${id}` : null));
  if (!data) return <Loading />;
  if (error) return <div>oooh looks like that post has either been deleted or does not exist</div>;
  return <PostLayout post={data} />;
};

export default Post;
