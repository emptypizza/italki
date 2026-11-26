import { copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from '../page.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const docs = join(root, 'docs');
const staticFiles = [
  'styles.css',
  'sections.css',
  'app.js',
  'assets/favicon.svg',
  'assets/images/marc-choi-portrait.jpg',
];

function mediaPath(value, folder, extensions) {
  const pattern = new RegExp('^\\./assets/' + folder + '/[\\p{L}\\p{M}\\p{N} _.()-]+\\.(' + extensions + ')$', 'iu');
  if (typeof value !== 'string' || !pattern.test(value)) {
    throw new Error('Expected a public file under ./assets/' + folder + '/, got ' + value);
  }
  return value.slice(2);
}

export async function build(output) {
  const config = JSON.parse(await readFile(join(root, 'site-config.json'), 'utf8'));
  const { video } = config;
  if (!['ai-narrated-still-preview', 'recorded'].includes(video.kind)) {
    throw new Error('Unknown video.kind in site-config.json');
  }
  if (!['unavailable', 'available'].includes(config.bookingStatus)) {
    throw new Error('Unknown bookingStatus in site-config.json');
  }
  for (const key of ['italkiProfileUrl', 'bookingUrl']) {
    if (config[key] !== null && new URL(config[key]).protocol !== 'https:') {
      throw new Error(key + ' must be a confirmed HTTPS URL or null');
    }
  }
  const transcriptPath = mediaPath(video.transcript, 'transcripts', 'txt');
  const captionPath = mediaPath(video.caption, 'captions', 'vtt');
  const files = [
    ...staticFiles,
    mediaPath(video.src, 'video', 'mp4'),
    mediaPath(video.poster, 'images', 'jpg|jpeg|webp|png'),
    transcriptPath,
  ];
  const generated = new Map([['.nojekyll', '']]);
  if (video.captionSource) {
    const source = mediaPath(video.captionSource, 'captions', 'srt');
    files.push(source);
    const srt = (await readFile(join(root, source), 'utf8')).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    const cues = srt.replace(/^(\d{2}:\d{2}:\d{2}),(\d{3}) --> (\d{2}:\d{2}:\d{2}),(\d{3})/gm, '$1.$2 --> $3.$4');
    generated.set(captionPath, 'WEBVTT\n\n' + cues);
  } else {
    files.push(captionPath);
  }
  const transcript = await readFile(join(root, transcriptPath), 'utf8');
  generated.set('index.html', renderPage('en', config, transcript));
  generated.set('ko.html', renderPage('ko', config, transcript));

  await mkdir(output, { recursive: true });
  for (const file of files) {
    const target = join(output, file);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(join(root, file), target);
  }
  for (const [file, contents] of generated) {
    const target = join(output, file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, contents);
  }
  return { config, transcript, publishedFiles: [...files, ...generated.keys()] };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Finish the new output before replacing the published folder.
  const staging = await mkdtemp(join(root, '.pages-build-'));
  try {
    const { publishedFiles } = await build(staging);
    await rm(docs, { recursive: true, force: true });
    await rename(staging, docs);
    console.log('Built ' + publishedFiles.length + ' public files in docs/');
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}
