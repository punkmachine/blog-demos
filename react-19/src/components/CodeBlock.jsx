import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import '../prism-theme.css';

export const CodeBlock = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="code-block">
      <code className="language-jsx">
        {code}
      </code>
    </pre>
  );
};