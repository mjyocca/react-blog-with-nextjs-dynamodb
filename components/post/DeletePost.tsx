import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import type { ScopedMutator } from 'swr/dist/types';
import { useRouter } from 'next/router';
import { Modal, useModal, useToasts } from '@geist-ui/react';
import type { Toast } from '@geist-ui/react';
import type { PostEntity } from '@/lib/dynamodb';
const { Title, Action, Content } = Modal;

const deleteRequest = async (values: Partial<PostEntity>, fireToast: (t: Toast) => void, mutate?: ScopedMutator) => {
  const req = await fetch(`/api/post/${values?.slug}`, {
    method: 'DELETE',
    body: JSON.stringify(values),
  });
  if (req.status === 200) {
    fireToast({ type: 'success', text: 'Post was deleted successfully' });
  } else {
    fireToast({ type: 'error', text: 'Issue with deleting post' });
  }
};

type PostResponse = {
  posts: PostEntity[];
  nextCursor: string;
  prevCursor: string;
};

type DeletePostProps = {
  defaultValues?: Partial<PostEntity>;
  onCancel?: () => void;
  onClose: () => void;
  open: boolean;
};

export default function DeletePost({ open, onClose, onCancel, defaultValues }: DeletePostProps) {
  const router = useRouter();
  const { cursor } = router.query;
  const { mutate } = useSWRConfig();
  const [, setToast] = useToasts();
  const { setVisible, bindings } = useModal(open);
  useEffect(() => {
    setVisible(open);
    return () => {};
  }, [open, setVisible]);

  const cancelHandler = () => {
    if (onCancel) onCancel();
    onClose();
  };

  const deleteHandler = async () => {
    await deleteRequest(defaultValues as PostEntity, setToast, mutate);
    const mutateKey = `/api/posts?${cursor ? `startkey=${cursor}&` : ''}limit=4`;
    mutate(mutateKey, async (postResponse: PostResponse) => {
      const { posts = [] } = postResponse || {};
      const filtered = posts.filter((post) => post.slug !== defaultValues?.slug);
      return {
        ...postResponse,
        posts: filtered,
      };
    });
    router.push('/posts');
  };

  return (
    <>
      <Modal {...bindings} width={`800px`}>
        <Title>Delete: {defaultValues?.title}</Title>
        <Content>
          Are you sure you want to delete post, <b>{defaultValues?.title}</b>
        </Content>
        <Action onClick={cancelHandler} passive>
          Cancel
        </Action>
        <Action className="delete_action" onClick={deleteHandler}>
          Delete
        </Action>
      </Modal>
    </>
  );
}
