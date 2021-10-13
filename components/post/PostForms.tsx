import { Input, Textarea } from '@geist-ui/react';
import type { PostEntity } from '@/lib/dynamodb';

const StepOne: React.FC<Omit<FormStepProps, 'step'>> = ({ values, handleChange }) => {
  return (
    <>
      <div className="form_container">
        <Input name="title" onChange={handleChange} value={values.title} placeholder="title" width="100%" />
        <Input
          name="description"
          onChange={handleChange}
          value={values.description}
          placeholder="description"
          width="100%"
        />
        <Input name="slug" onChange={handleChange} value={values.slug} placeholder="url" width="100%" />
      </div>
      <style jsx>{`
        .form_container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
        }
      `}</style>
    </>
  );
};

const StepTwo: React.FC<Omit<FormStepProps, 'step'>> = ({ values, handleChange }) => {
  return (
    <>
      <div className="form_container">
        <Textarea
          name="body"
          onChange={handleChange as any}
          value={values.body}
          placeholder="Please enter a body for your new Blog Post."
          width="100%"
          height="600px"
          resize={`vertical`}
        />
      </div>
      <style jsx>{`
        .form_container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
        }
      `}</style>
    </>
  );
};

type FormStepProps = {
  step: number;
  values: Partial<PostEntity>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PostFormRouter: React.FC<FormStepProps> = ({ step, values, handleChange }) => {
  switch (step) {
    case 0:
      return <StepOne {...{ values, handleChange }} />;
    case 1:
      return <StepTwo {...{ values, handleChange }} />;
    default:
      return <></>;
  }
};
