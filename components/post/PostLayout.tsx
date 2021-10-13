import { useState } from 'react';
import { Button, Collapse, Description, Divider, Page, Spacer, Text, Textarea } from '@geist-ui/react';
import { useToasts } from '@geist-ui/react';
import { Edit, Delete } from '@geist-ui/react-icons';
import type { PostEntity } from '@/lib/dynamodb';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import { useForms } from '@/lib/hooks';
import { useSWRConfig } from 'swr';

type PostProps = {
  post: PostEntity;
};

const PostLayout: React.FC<PostProps> = ({ post }: PostProps) => {
  const { mutate } = useSWRConfig();
  const [, setToast] = useToasts();
  const [{ openEdit, openDelete }, setState] = useState({ openEdit: false, openDelete: false });
  const { values, setValues } = useForms<{ body: string }>({ body: '' });
  const postEditOpen = () => setState((s) => ({ ...s, openEdit: true }));
  const postDeleteOpen = () => setState((s) => ({ ...s, openDelete: true }));
  const editCancelhandler = () => setState((s) => ({ ...s, openEdit: false }));
  const deleteCancelHandler = () => setState((s) => ({ ...s, openDelete: false }));
  const { slug, title, description, commentItems } = post;
  const handleCommentSubmit = () => {
    mutate(`/api/post/${slug}`, async ({ commentItems: comments, ...postData }: PostEntity) => {
      const updatedPost = {
        ...postData,
        commentItems: [{ body: values.body, createddate: `${new Date().getTime()}` }, ...comments],
      };
      const res = await fetch(`/api/post/${slug}`, { method: 'PATCH', body: JSON.stringify(updatedPost) });
      if (res.status === 200) {
        setToast({ type: 'success', text: `Post was successfully updated` });
        return updatedPost;
      }
      setToast({ type: 'error', text: `Error` });
      return {
        commentItems: comments,
        ...postData,
      };
    });
  };
  return (
    <>
      <Page>
        <Page.Header>
          <div className="post_container">
            <Text h1>{title}</Text>
            <div className="actions">
              <Button onClick={postEditOpen} className="action_button" auto iconRight={<Edit />}>
                Edit
              </Button>
              <Button onClick={postDeleteOpen} className="action_button" auto iconRight={<Delete />}>
                Delete
              </Button>
            </div>
          </div>
          <Description title="Description" content={description} />
        </Page.Header>
        <Page.Content>
          <div style={{ minHeight: '500px' }}>{post.body}</div>
          <Divider />
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text>Add a Comment</Text>
              <Textarea
                width="100%"
                value={values.body}
                onChange={(e) => setValues((s) => ({ ...s, body: e.target.value }))}
              ></Textarea>
              <Button
                style={{ marginLeft: 'auto', marginTop: '10px' }}
                auto
                scale={1 / 3}
                onClick={handleCommentSubmit}
              >
                Submit
              </Button>
            </div>
            <Spacer />
            <Collapse.Group>
              <Collapse title={`Comments (${commentItems.length})`}>
                <div style={{ width: '100%' }}>
                  {commentItems?.map((comment, idx) => {
                    return (
                      <div style={{ width: '100%' }} key={idx}>
                        <Text>{comment.body}</Text>
                      </div>
                    );
                  })}
                </div>
              </Collapse>
            </Collapse.Group>
          </div>
        </Page.Content>
      </Page>
      <EditPost defaultValues={post} open={openEdit} onClose={editCancelhandler} />
      <DeletePost defaultValues={post} open={openDelete} onClose={deleteCancelHandler} />
      <style jsx>{`
        .post_container {
          display: flex;
        }
        .actions {
          display: flex;
          margin-left: auto;
        }
        button.action_button {
          padding: 5px !important;
          margin: 5px !important;
        }
      `}</style>
    </>
  );
};

export default PostLayout;
