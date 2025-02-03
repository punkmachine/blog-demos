import React, { use, useMemo } from 'react';

const mockTodoData = {
  userId: 1,
  id: 1,
  title: "Vue > React",
};

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTodoData);
    }, 2500);
  });
}

function DataComponent({ dataPromise, disabledFetch }) {
  if (disabledFetch) {
    return <p>Fetching is disabled.</p>;
  }

  const data = use(dataPromise);

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function DemoComponent() {
  const dataPromise = useMemo(() => fetchData(), []);

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <DataComponent dataPromise={dataPromise} disabledFetch={false} />
    </React.Suspense>
  );
}
