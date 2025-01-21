import { CodeBlock } from '../../components/CodeBlock';

export const React19Code = () => {
  const code = `function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (name.length < 3) {
        setError("Имя должно быть длиннее 2 символов");
        return;
      }

      setError(null);
    });
  };

  return (
    <div>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}`;

  return <CodeBlock code={code} />;
};