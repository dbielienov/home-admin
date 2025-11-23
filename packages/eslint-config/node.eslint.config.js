import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

const expressConfig = defineConfig([
	js.configs.recommended,
	...ts.configs.recommended,
	...ts.configs.stylistic,
	{
		plugins: { prettier: prettierPlugin },
		rules: {
			'prettier/prettier': ['error'],
		},
	},
	globalIgnores(['node_modules/**', 'dist/**', 'build/**', 'temp/**', '*.js']),
]);

export default expressConfig;
