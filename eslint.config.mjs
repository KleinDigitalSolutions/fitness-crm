// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Spezifische ESLint-Regeln überschreiben
    rules: {
      "react/display-name": "off", // Deaktiviert die Regel 'react/display-name'
      "react/no-unescaped-entities": "off", // Deaktiviert die Warnung für unescaped entities
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'warn',
    },
  },
];

export default eslintConfig;