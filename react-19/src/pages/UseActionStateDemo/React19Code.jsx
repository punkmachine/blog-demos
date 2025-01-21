import { CodeBlock } from '../../components/CodeBlock';

export const React19Code = () => {
  const code = `function UpdateNameForm() {
  const [formState, formAction, isPending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name");
      const error = await updateName(name);
      if (error) {
        return { error, name };
      }
      return { error: null, name: "" };
    },
    { error: null, name: "" }
  );

  return (
    <form action={formAction}>
      <input
        type="text"
        name="name"
        value={formState.name}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Обновление..." : "Обновить"}
      </button>
      {formState.error && (
        <p className="error">{formState.error}</p>
      )}
    </form>
  );
}`;

  return <CodeBlock code={code} />;
};