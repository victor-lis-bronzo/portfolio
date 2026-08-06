import { install, Browser, detectBrowserPlatform } from '@puppeteer/browsers';
import path from 'node:path';
import os from 'node:os';

async function main() {
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error('Não foi possível detectar a plataforma do sistema.');
  }

  const cacheDir = path.join(os.homedir(), '.cache', 'puppeteer');
  console.log('📥 Baixando Chrome para Puppeteer em:', cacheDir);

  const result = await install({
    browser: Browser.CHROME,
    buildId: '135.0.7049.3', // versão estável recente do Chrome para Puppeteer
    cacheDir,
    platform,
  });

  console.log('✅ Chrome instalado com sucesso em:', result.executablePath);
}

main().catch((err) => {
  console.error('❌ Erro ao baixar Chrome:', err);
  process.exit(1);
});
