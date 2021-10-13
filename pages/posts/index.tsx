import React, { useState, useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';
import type { KeyLoader } from 'swr';
import fetcher from '@/lib/fetch';
import type { PostEntity } from '@/lib/dynamodb';
import PostCard from '@/components/post/PostCard';
import { Button, Grid, Loading, Note, Page, Spacer } from '@geist-ui/react';
import { ChevronLeft, ChevronRight } from '@geist-ui/react-icons';
import { CreatePost } from '@/components/post';

type PostResponse = {
  posts: PostEntity[];
  nextCursor: string;
  prevCursor: string;
};

const getKey: KeyLoader = (pageIndex: number, previousPageData: PostResponse) => {
  const limit = 4;
  // reached the end
  if (previousPageData && !previousPageData.posts) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/posts?limit=${limit}`;
  // add the cursor to the API endpoint
  return `/api/posts?startkey=${encodeURIComponent(previousPageData.nextCursor)}&limit=${limit}`;
};

export default function Posts() {
  const [{ openForm }, setState] = useState({ openForm: false });
  const { data = [], size, setSize } = useSWRInfinite<PostResponse>(getKey, fetcher);
  const nextRequestHandler = useCallback(() => setSize((s) => s + 1), [setSize]);
  const prevRequestHandler = useCallback(() => setSize((size) => (size === 1 ? size : size - 1)), [setSize]);
  const newPostHandler = useCallback(() => setState((s) => ({ ...s, openForm: true })), []);
  const postCancelhandler = useCallback(() => setState((s) => ({ ...s, openForm: false })), []);
  const currentResponse = data[size - 1];

  return (
    <>
      <Page>
        <Page.Header>
          <div className="action_container">
            <Button onClick={newPostHandler} shadow auto type="success">
              New Post
            </Button>
            <CreatePost open={openForm} onClose={postCancelhandler} />
          </div>
        </Page.Header>
        <Page.Content style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <Spacer inline w={0.35} />
          <Grid.Container gap={2} justify="center">
            {currentResponse &&
              currentResponse?.posts.map((post, idx) => {
                return (
                  <Grid xs={10} key={idx}>
                    <PostCard width="100%" post={post} cursor={currentResponse.prevCursor} />
                  </Grid>
                );
              })}
          </Grid.Container>
          {!currentResponse && <Loading />}
          {currentResponse && !currentResponse?.nextCursor && <Note style={{ margin: 'auto' }}>Final Page</Note>}
        </Page.Content>
        <Page.Footer style={{ position: 'relative' }}>
          <div className="pagination_container">
            <div className="pagination_controls">
              <div>
                <Button disabled={size === 1} onClick={prevRequestHandler} shadow auto icon={<ChevronLeft />} />
              </div>
              <Spacer />
              <div>
                <Button
                  disabled={!currentResponse?.nextCursor}
                  onClick={nextRequestHandler}
                  shadow
                  auto
                  icon={<ChevronRight />}
                />
              </div>
            </div>
          </div>
        </Page.Footer>
      </Page>
      <style jsx>{`
        .action_container {
          display: flex;
          right: 0;
          flex-direction: row-reverse;
        }
        .pagination_container {
          display: flex;
          margin: auto;
        }
        .pagination_controls {
          display: flex;
          justify-content: center;
          margin: 5px auto;
        }
      `}</style>
    </>
  );
}
