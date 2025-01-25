import { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';
import { transformerNotationDiff } from '@shikijs/transformers';

let highlighterInstance;

// [!code --]
// [!code ++]

const getHighlighter = async () => {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['github-dark'],
      langs: ['javascript', 'jsx', 'typescript', 'tsx'],
    });
  }
  return highlighterInstance;
};

export const CodeBlock = ({ code }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const highlight = async () => {
      const highlighter = await getHighlighter();

      const highlighted = await highlighter.codeToHtml(code, {
        lang: 'jsx',
        theme: 'github-dark',
        transformers: [
          transformerNotationDiff({
            matchAlgorithm: 'v3'
          })
        ]
      });

      setHtml(highlighted);
    };

    highlight();
  }, [code]);

  return (
    <div
      className="code-block"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};