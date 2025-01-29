import { CodeBlock } from '../../components/CodeBlock';

export const React18Code = () => {
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

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Обновление..." : "Обновить"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}`;

  return <CodeBlock code={code} />;
};