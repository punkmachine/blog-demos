import React from 'react';
import { React19Code } from './React19Code';
import { React19View } from './React19View';
import { CodeBlock } from '../../components/CodeBlock';

export const UseFormStatusDemo2: React.FC = () => {
  const codeZod = `const FormSchema = z.object({
  name: z.string()
    .min(2, { message: "Длина имени должна быть не менее двух символов (Zod)" })
    .regex(/^[a-zA-Z]+$/, 'Имя должно содержать только латинские буквы (Zod)')
    .trim(),
});

type FormState = {
  error?: string;
  name?: string;
}
`;

  const newAction = `async function formAction(previousState: FormState, formData: FormData): Promise<FormState> {
  // get(name: string): FormDataEntryValue | null;
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
}`

const newCode = `export const React19View = () => {
  const [state, action] = useActionState(formAction, {});

  return (
    <form action={action}>
      <input
        name="name"
        defaultValue={state.name}
      />
      <ButtonForm />
      {state.error && (<p>{state.error}</p>)}
    </form>
  );
};`;

  return (
    <div className="use-action-state-demo">
      <h2 className="demo-subtitle demo-subtitle--center">Добавляем TS и ZOD</h2>

      <div className='center-code'>
        <div className="demo-code">
          <CodeBlock code={codeZod} />
        </div>
      </div>

      <h2 className="demo-subtitle demo-subtitle--center">Добавляем их в action</h2>

      <div className='center-code'>
        <div className="demo-code">
          <CodeBlock code={newAction} />
        </div>
      </div>

      <h2 className="demo-subtitle demo-subtitle--center">Компонент</h2>

      <div className='center-code'>
        <div className="demo-code">
          <CodeBlock code={newCode} />
        </div>
      </div>

      <h2 className="demo-subtitle demo-subtitle--center">А как выглядит?</h2>

      <div className='center-code'>
        <div className="demo-preview">
          <React19View />
        </div>
      </div>

      {/* <div className="demo-row">
        <div className="demo-code">
          <React19Code />
        </div>
        <div className="demo-preview">
          <React19View />
        </div>
      </div> */}
    </div>
  );
};