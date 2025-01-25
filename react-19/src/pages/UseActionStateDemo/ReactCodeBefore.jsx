import { CodeBlock } from '../../components/CodeBlock';

export const ReactCodeBefore = () => {
  const code = `function UpdateNameForm() {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsPending(true);
      const error = await updateName(name);
      setIsPending(false);
      if (error) {
        setError(error);
        return;
      }
      setError(null);
      setName("");
    };
  }`;

    return <CodeBlock code={code} />;
};