import { useState, useTransition } from 'react';

export const React19View = () => {
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
    <div className="demo-view">
      <input
        className="demo-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Введите имя"
      />
      <button
        className="demo-button"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? 'Обновление...' : 'Обновить'}
      </button>
      {error && <p className="demo-error">{error}</p>}
    </div>
  );
};