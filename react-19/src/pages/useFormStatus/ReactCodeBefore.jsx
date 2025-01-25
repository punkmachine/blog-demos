import { CodeBlock } from '../../components/CodeBlock';

export const ReactCodeBefore = () => {
  const code = `const ButtonForm = ({ isPending }) => { // [!code --]
  return (
    <button
      className="demo-button"
      type="submit"
      disabled={isPending}
    >
      {isPending ? "Обновление..." : "Обновить"}
    </button>
  );
}

export const Form = () => {
  const [name, setName] = useState(""); // [!code --]
  const [error, setError] = useState(null); // [!code --]
  const [isPending, setIsPending] = useState(false); // [!code --]

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
    <form onSubmit={handleSubmit}> // [!code --]
      <input
        type="text"
        name="name"
        value={name} // [!code --]
        onChange={(e) => setName(e.target.value)} // [!code --]
        placeholder="Введите имя"
      />
      <ButtonForm
        isPending={isPending} // [!code --]
      />
      {error && <p>{error}</p>} // [!code --]
    </form>
  );
};`;

    return <CodeBlock code={code} />;
};