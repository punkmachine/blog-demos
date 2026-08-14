// jscodeshift codemod: CommonJS require() -> ES import
//
//   const fs = require('fs');                    ->  import fs from 'fs';
//   const { readFile } = require('fs/promises');  ->  import { readFile } from 'fs/promises';
//
// Переписывает только require() верхнего уровня (прямые statement'ы Program).
// Условный/ленивый require() внутри функций не трогает — автоматически
// превращать его в статический import небезопасно.
//
// Запуск:
//   npx jscodeshift -t require-to-import.js --dry --print src/**/*.js
//   npx jscodeshift -t require-to-import.js src/**/*.js

function isTopLevelRequire(path) {
  if (path.parent.node.type !== 'Program') return false;
  if (path.node.declarations.length !== 1) return false;

  const [decl] = path.node.declarations;
  const call = decl.init;
  if (!call || call.type !== 'CallExpression') return false;
  if (call.callee.type !== 'Identifier' || call.callee.name !== 'require') return false;

  const arg = call.arguments[0];
  return (
    call.arguments.length === 1 &&
    arg &&
    (arg.type === 'StringLiteral' || arg.type === 'Literal') &&
    typeof arg.value === 'string'
  );
}

function toImportSpecifiers(j, id) {
  if (id.type === 'Identifier') {
    return [j.importDefaultSpecifier(j.identifier(id.name))];
  }

  if (
    id.type === 'ObjectPattern' &&
    id.properties.every((p) => p.key && p.key.type === 'Identifier')
  ) {
    return id.properties.map((prop) =>
      j.importSpecifier(j.identifier(prop.key.name), j.identifier(prop.value.name))
    );
  }

  return null;
}

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.VariableDeclaration)
    .filter(isTopLevelRequire)
    .forEach((path) => {
      const [decl] = path.node.declarations;
      const source = decl.init.arguments[0];
      const specifiers = toImportSpecifiers(j, decl.id);

      if (!specifiers) return;

      j(path).replaceWith(j.importDeclaration(specifiers, source));
    });

  return root.toSource({ quote: 'single' });
};
