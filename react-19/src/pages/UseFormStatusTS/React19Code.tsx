import React from 'react';
import { CodeBlock } from '../../components/CodeBlock';

export const React19Code = () => {
  const code = `const ButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Обновление..." : "Обновить"}
    </button>
  );
};

export const Form = () => {
  const [formState, formAction] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name");
      const error = await updateName(name);

      if (error) {
        return { error, name };
      }

      return { error: null, name: '' };
    },
    { error: null, name: "" }
  );

  return (
    <form action={formAction}>
      <input type="text" name="name" />
      <ButtonForm />
      {formState.error && <p>{formState.error}</p>}
    </form>
  );
};`;

  return <CodeBlock code={code} />;
};