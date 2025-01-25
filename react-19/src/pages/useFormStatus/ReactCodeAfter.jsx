import { CodeBlock } from '../../components/CodeBlock';

export const ReactCodeAfter = () => {
  const code = `const ButtonForm = () => { // [!code ++]
  const { pending } = useFormStatus(); // [!code ++]

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

export const Form = () => {
  const [formState, formAction] = useFormState( // [!code ++]
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
      <input
        type="text"
        name="name"
        placeholder="Введите имя"
      />
      <ButtonForm />
      {formState.error && (<p>{formState.error}</p>)}
    </form>
  );
};`;

  return <CodeBlock code={code} />;
};