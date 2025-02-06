import React from 'react';
import { z } from "zod";
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateName } from './updateName';

const FormSchema = z.object({
  name: z.string()
    .min(2, { message: "Длина имени должна быть не менее двух символов (Zod)" })
    .regex(/^[a-zA-Z]+$/, 'Имя должно содержать только латинские буквы (Zod)')
    .trim(),
});

type FormState = {
  error?: string;
  name?: string;
}

async function formAction(previousState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string;
  const validated = FormSchema.safeParse({ name });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
      name,
    };
  }

  await updateName(name);

  return { name };
}

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
  const [state, action] = useActionState(formAction, {});

  return (
    <form className="demo-form" action={action}>
      <input
        className="demo-input"
        type="text"
        name="name"
        defaultValue={state.name}
        placeholder="Введите имя"
      />
      <ButtonForm />
      {state.error && (
        <p className="demo-error">{state.error}</p>
      )}
    </form>
  );
};