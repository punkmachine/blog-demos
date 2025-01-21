import { useActionState } from 'react';
import { updateName } from './updateName';

export const React19View = () => {
  const [formState, formAction, isPending] = useActionState(
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
      <button
        className="demo-button"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Обновление..." : "Обновить"}
      </button>
      {formState.error && (
        <p className="demo-error">{formState.error}</p>
      )}
    </form>
  );
};