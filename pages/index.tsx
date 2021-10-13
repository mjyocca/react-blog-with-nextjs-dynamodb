import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import { useGithub } from '@/lib/hooks';
import { Button, Display, Grid, Image, Spacer, Snippet, Text } from '@geist-ui/react';
import Profile from '@/components/Profile';
import PostCard from '@/components/post/PostCard';
import { CreatePost } from '@/components/post';
import type { PostEntity } from '@/lib/dynamodb';

type PostResponse = {
  posts: PostEntity[];
  nextCursor: string;
};

const Home: NextPage = () => {
  const { data } = useSWR<PostResponse>(`/api/posts?limit=2`);
  const { posts } = data || {};
  const [open, setOpen] = useState(false);
  const { data: user } = useGithub({ profile: true });
  return (
    <>
      <Head>
        <link rel="icon" href={user?.profile?.avatar_url} />
      </Head>
      <div className="home_header">
        <Profile />
        <Button onClick={() => setOpen(true)}>New Post</Button>
      </div>
      <Spacer inline w={0.35} />
      <Grid.Container gap={2} justify="center">
        <Grid xs>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Text h4>Getting Started (Running Local)</Text>
            <Snippet
              text={[
                'git clone https://github.com/mjyocca/react-blog-with-nextjs-dynamodb.git',
                'npm install',
                'npm run docker',
              ]}
              width="100%"
            />
            <Display shadow caption="An open-source design system for building modern websites and applications.">
              <Image width="435px" height="200px" src="https://react.geist-ui.dev/images/geist-banner.png" alt="test" />
            </Display>
          </div>
        </Grid>
        <Grid xs>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text h3>Recent Blog Posts</Text>
            {posts && posts?.map((post, idx) => <PostCard key={idx} post={post} />)}
          </div>
        </Grid>
      </Grid.Container>
      <CreatePost open={open} onClose={() => setOpen(false)} />
      <style jsx>{`
        .home_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default Home;
