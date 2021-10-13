import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { Modal, useModal, useToasts } from '@geist-ui/react';
import type { Toast } from '@geist-ui/react';
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

const editRequest = async (values: PostEntity, fireToast: (t: Toast) => void) => {
  const response = await fetch(`/api/post/${values.slug}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
  if (response.status === 200) {
    fireToast({ type: 'success', text: `Edit: ${values.title} was successful` });
    return;
  }
};

type EditPostProps = {
  defaultValues?: Partial<PostEntity>;
  onCancel?: () => void;
  onClose: () => void;
  open: boolean;
};

export default function EditPost({ open, onClose, defaultValues = {}, onCancel }: EditPostProps) {
  const { mutate } = useSWRConfig();
  const { values, handleInputChange } = useForms<Partial<PostEntity>>({ ...emptyPost, ...defaultValues });
  const [{ step }, setState] = useState({ step: 0 });
  const { setVisible, bindings } = useModal(open);
  const [, setToast] = useToasts();
  useEffect(() => setVisible(open), [open, setVisible]);

  const cancelHandler = () => {
    if (onCancel) onCancel();
    onClose();
  };
  const prevHandler = () => setState((s) => ({ ...s, step: s.step - 1 }));
  const nextHandler = () => setState((s) => ({ ...s, step: s.step + 1 }));
  const saveHandler = async () => {
    mutate(`/api/post/${values.slug}`, values, true);
    await editRequest(values as PostEntity, setToast);
    mutate(`/api/post/${values.slug}`, values);
    onClose();
  };
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
