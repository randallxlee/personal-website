import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const pdfPath = path.join(projectRoot, 'public', 'resume.pdf');
const outputPath = path.join(projectRoot, 'src', 'data', 'resumeFromPdf.ts');

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();
}

function extractExperienceSection(text) {
  const sectionMatches = [
    /(work experience|experience)([\s\S]*?)(technical skills|education|skills|volunteer|community|$)/i,
    /(professional experience|experience)([\s\S]*?)(technical skills|education|skills|volunteer|community|$)/i,
  ];

  for (const regex of sectionMatches) {
    const match = regex.exec(text);
    if (match && match[2]) {
      return match[2].trim();
    }
  }

  return text.trim();
}

function buildParagraphs(text) {
  const cleaned = extractExperienceSection(text)
    .replace(/\r/g, '')
    .replace(/\t/g, ' ')
    .replace(/\n{3,}/g, '\n\n');

  const blocks = cleaned
    .split(/\n\n+/)
    .map((block) => normalizeText(block))
    .filter((block) => block.length > 20 && /[A-Za-z]/.test(block));

  return blocks.slice(0, 10);
}

try {
  const pdfBytes = await fs.readFile(pdfPath);
  const pdfData = new Uint8Array(pdfBytes);
  const pdfDocument = await getDocument({ data: pdfData }).promise;
  const textChunks = [];

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    const page = await pdfDocument.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');

    if (pageText.trim()) {
      textChunks.push(pageText);
    }
  }

  const fullText = textChunks.join('\n\n');
  const paragraphs = buildParagraphs(fullText);

  const output = `export const RESUME_EXPERIENCE_TEXT = ${JSON.stringify(paragraphs, null, 2)} as const;\n`;

  await fs.writeFile(outputPath, output, 'utf8');
  console.log(`Generated resume text data for ${paragraphs.length} paragraph(s) from ${pdfPath}`);
} catch (error) {
  const fallback = `export const RESUME_EXPERIENCE_TEXT = [] as const;\n`;
  await fs.writeFile(outputPath, fallback, 'utf8');
  console.warn('Could not parse resume.pdf at build time. Falling back to an empty experience list.');
  console.warn(error instanceof Error ? error.message : String(error));
}
