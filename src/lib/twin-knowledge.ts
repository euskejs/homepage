import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Read at request time so saving the file updates local chat without a restart.
// Kept outside public/ so it is not served as a downloadable website asset.
export async function readTwinKnowledge(
  filePath = path.join(process.cwd(), 'src/data/ai-twin-knowledge.txt'),
): Promise<string> {
  const text = await readFile(filePath, 'utf8');
  if (text.length > 20000) throw new Error('AI Twin knowledge file exceeds 20,000 characters.');
  return text.split(/\r?\n/).filter(line => !line.trimStart().startsWith('#')).join('\n').trim();
}
