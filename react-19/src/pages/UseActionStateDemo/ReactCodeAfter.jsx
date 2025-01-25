import { CodeBlock } from '../../components/CodeBlock';

export const ReactCodeAfter = () => {
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
}`;

  return <CodeBlock code={code} />;
};