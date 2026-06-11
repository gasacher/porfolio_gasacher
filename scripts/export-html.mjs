import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const distDir = join(root, 'dist');
const exportDir = join(root, 'html-export');

if (!existsSync(distDir)) {
  console.error('No existe dist/. Ejecutá npm run build primero.');
  process.exit(1);
}

rmSync(exportDir, { recursive: true, force: true });
mkdirSync(exportDir, { recursive: true });
cpSync(distDir, exportDir, { recursive: true });

const zipPath = join(root, 'portfolio-html.zip');
try {
  rmSync(zipPath, { force: true });
  execSync(`cd "${exportDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
} catch {
  console.warn('No se pudo crear portfolio-html.zip (zip no disponible).');
}

console.log('');
console.log('Portfolio HTML generado:');
console.log(`  → ${join(exportDir, 'index.html')}`);
console.log(`  → ${zipPath}`);
console.log('');
console.log('Subí el contenido de html-export/ a GitHub Pages.');
