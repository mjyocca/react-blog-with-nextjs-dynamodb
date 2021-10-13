import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { useModal, useToasts } from '@geist-ui/react';
import type { Toast } from '@geist-ui/react';
import { Modal } from '@geist-ui/react';
import { PostFormRouter } from './PostForms';
import { useForms } from '@/lib/hooks/useForm';
import type { PostEntity } from '@/lib/dynamodb';
const { Title, Action, Content } = Modal;

const emptyPost: Partial<PostEntity> = {
  slug: '',
  title: '',
  description: '',
  body: '',
};

const createRequest = async (post: PostEntity, fireToast: (t: Toast) => void) => {
  const req = await fetch(`/api/posts`, { method: 'POST', body: JSON.stringify(post) });
  const res = await req.json();
  if (req.status === 200) {
    fireToast({ type: 'success', text: `Post was successfully created` });
    return;
  }
  fireToast({ type: 'error', text: `Issue with creating post` });
};

type CreatePostProps = {
  defaultValues?: Partial<PostEntity>;
  onCancel?: () => void;
  onClose: () => void;
  open: boolean;
};

export default function CreatePost({ open, onClose, defaultValues = {}, onCancel }: CreatePostProps) {
  const { mutate } = useSWRConfig();
  const { values, setValues, handleInputChange } = useForms<Partial<PostEntity>>({ ...emptyPost, ...defaultValues });
  const [{ step }, setState] = useState({ step: 0 });
  const { setVisible, bindings } = useModal(open);
  const [_, setToast] = useToasts();
  useEffect(() => setVisible(open), [open, setVisible]);

  const cancelHandler = () => {
    if (onCancel) onCancel();
    reset();
  };
  const reset = () => {
    setTimeout(() => {
      setValues({ ...emptyPost });
      setState({ step: 0 });
    }, 500);
    onClose();
  };
  const saveHandler = async () => {
    await createRequest(values as PostEntity, setToast);
    mutate(`/api/posts?limit=4`);
    reset();
  };
  const prevHandler = () => setState((s) => ({ ...s, step: s.step - 1 }));
  const nextHandler = () => setState((s) => ({ ...s, step: s.step + 1 }));
  return (
    <>
      <Modal {...bindings} width={`800px`}>
        <Title>New Post</Title>
        <Content>
          <PostFormRouter step={step} values={values} handleChange={handleInputChange} />
        </Content>
        <Action onClick={cancelHandler} passive>
          Cancel
        </Action>
        {step === 1 && (
          <Action onClick={prevHandler} passive>
            Previous
          </Action>
        )}
        {step === 1 ? (
          <Action onClick={saveHandler} passive>
            Save
          </Action>
        ) : (
          <Action onClick={nextHandler} passive>
            Next
          </Action>
        )}
      </Modal>
    </>
  );
}
