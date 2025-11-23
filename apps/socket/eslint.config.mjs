import { defineConfig } from 'eslint/config';
import nodeConfig from '@repo/eslint-config/express';

const eslintConfig = defineConfig([...nodeConfig]);

export default eslintConfig;
