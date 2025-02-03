import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateName } from './updateName';

const ButtonForm = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="demo-button"
      type="submit"
      disabled={pending}
    >
      {pending ? "Обновление..." : "Обновить"}
    </button>
  );
};

export const React19View = () => {
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
    <form className="demo-form" action={formAction}>
      <input
        className="demo-input"
        type="text"
        name="name"
        placeholder="Введите имя"
      />
      <ButtonForm />
      {formState.error && (
        <p className="demo-error">{formState.error}</p>
      )}
    </form>
  );
};