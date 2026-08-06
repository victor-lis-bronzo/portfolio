import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import puppeteer, { type LaunchOptions } from 'puppeteer';

export async function generatePdfFromHtml(html: string, filename?: string): Promise<string> {
  const baseDir = path.join(os.homedir(), 'Documents', 'resumes');
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const cleanFilename = filename
    ? filename.endsWith('.pdf') ? filename : `${filename}.pdf`
    : `resume-${Date.now()}.pdf`;

  const outputPath = path.resolve(baseDir, cleanFilename);

  const baseArgs = ['--no-sandbox', '--disable-setuid-sandbox'];
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: baseArgs,
    });
  } catch (err) {
    // Se o Chrome empacotado do Puppeteer não estiver presente, utiliza o Chrome/Edge do sistema
    try {
      browser = await puppeteer.launch({
        headless: true,
        channel: 'chrome',
        args: baseArgs,
      } as LaunchOptions);
    } catch {
      browser = await puppeteer.launch({
        headless: true,
        channel: 'msedge' as any,
        args: baseArgs,
      });
    }
  }

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm',
      },
    });

    return outputPath;
  } finally {
    await browser.close();
  }
}
