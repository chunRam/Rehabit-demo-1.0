import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, '..', 'dist');

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'main.jsbundle'), "// Rehabit mobile bundle placeholder\n", {
  flag: 'w',
});

console.log('Simulating React Native build for Rehabit mobile application...');
console.log(`Bundle generated at ${join('./dist', 'main.jsbundle')}`);
