import { useState } from 'react';
import { updateName } from './updateName';

export const React18View = () => {
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
    <form className="demo-form" onSubmit={handleSubmit}>
      <input
        className="demo-input"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя"
      />
      <button
        className="demo-button"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Обновление..." : "Обновить"}
      </button>
      {error && <p className="demo-error">{error}</p>}
    </form>
  );
};