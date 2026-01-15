// Utility function to parse text and extract variables in {{ variableName }} syntax
// Only allows valid JavaScript identifiers and returns a unique list

export function parseVariables(text) {
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = new Set();

  let match;
  while ((match = variableRegex.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
}

// Usage example:
// const text = "Hello {{ name }}, your age is {{ age }} and name again {{ name }}.";
// const vars = parseVariables(text);
// console.log(vars); // ['name', 'age']