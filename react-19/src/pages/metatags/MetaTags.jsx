import { Helmet } from "react-helmet";
import { CodeBlock } from '../../components/CodeBlock';

export const MetaTags = () => {
  const code1 = `export const MetaTags = () => {
  return (
    <div>
      <title>MetaTags title 1</title>
      <title>MetaTags title 2</title>
      <title>MetaTags title 3</title>

      <CodeBlock code={code} />
    </div>
  );
};`;

  const code2 = `<title>MetaTags title 3</title>
<title>MetaTags title 2</title>
<title>MetaTags title 1</title>
<title>Vite + React</title>`;

  return (
    <div className='use-action-state-demo'>
      <title>MetaTags title 1</title>
      <title>MetaTags title 2</title>
      <title>MetaTags title 3</title>

      {/* <Helmet>
        <title>MetaTags title 1</title>
        <title>MetaTags title 2</title>
        <title>MetaTags title 3</title>
      </Helmet> */}

      <h2 className="demo-subtitle">Мета-теги</h2>

      <div className="demo-row">
        <div className="demo-code">
          <CodeBlock code={code1} />
        </div>
        <div className="demo-code">
          <CodeBlock code={code2} />
        </div>
      </div>
    </div>
  );
};