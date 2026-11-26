import assert from 'node:assert/strict';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const output = await mkdtemp(join(tmpdir(), 'marc-site-check-'));
const docs = fileURLToPath(new URL('../docs/', import.meta.url));
const sections = ['top', 'lessons', 'how', 'topics', 'about', 'background', 'video', 'faq', 'next'];
const projectBase = new URL('https://example.test/italki/');

function checkLinks(html, ids, files, fileName) {
  for (const match of html.matchAll(/\s(?:href|src|poster)="([^"]*)"/gi)) {
    const value = match[1];
    assert(value && value !== '#', fileName + ' has an empty link');
    if (value.startsWith('#')) {
      assert(ids.has(value.slice(1)), 'Missing anchor ' + value);
      continue;
    }
    const url = new URL(value, projectBase);
    if (url.origin !== projectBase.origin) {
      assert.equal(url.protocol, 'https:', 'External links must use HTTPS');
      continue;
    }
    assert(!value.startsWith('/') && url.pathname.startsWith(projectBase.pathname), 'Use project-relative URLs: ' + value);
    const file = decodeURIComponent(url.pathname.slice(projectBase.pathname.length)) || 'index.html';
    assert(files.includes(file), 'Missing from build: ' + file);
  }
}

async function listedFiles(dir, prefix = '') {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) {
      files.push(...await listedFiles(join(dir, entry.name), name + '/'));
    } else {
      assert(entry.isFile(), 'Unexpected entry in docs/: ' + name);
      files.push(name);
    }
  }
  return files.sort();
}

try {
  const { config, transcript, publishedFiles } = await build(output);
  const { video } = config;
  assert.deepEqual(await listedFiles(docs), [...publishedFiles].sort(), 'docs/ file list differs from a fresh build. Run npm run build.');
  for (const file of publishedFiles) {
    const expected = await readFile(join(output, file));
    const actual = await readFile(join(docs, file));
    assert(expected.equals(actual), 'Stale docs/' + file + '. Run npm run build.');
  }

  const vtt = await readFile(join(output, video.caption), 'utf8');
  assert(vtt.startsWith('WEBVTT\n'), 'Invalid WebVTT header');
  const timings = [...vtt.matchAll(/^(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/gm)];
  assert(timings.length > 0, 'Missing timed captions');
  for (const [, start, end] of timings) assert(start < end, 'Invalid caption duration');
  if (video.captionSource) {
    const srt = await readFile(join(output, video.captionSource), 'utf8');
    assert.equal(timings.length, srt.split(' --> ').length - 1, 'Some SRT cues failed conversion');
  }

  for (const [fileName, lang] of [['index.html', 'en'], ['ko.html', 'ko']]) {
    const html = await readFile(join(output, fileName), 'utf8');
    assert(html.includes('<html lang="' + lang + '"'), fileName + ' has the wrong language');
    assert.equal([...html.matchAll(/<h1(?:\s|>)/gi)].length, 1, fileName + ' needs one h1');
    const idList = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    const ids = new Set(idList);
    assert.equal(ids.size, idList.length, fileName + ' has duplicate IDs');
    for (const section of sections) assert(ids.has(section), 'Missing section #' + section);
    checkLinks(html, ids, publishedFiles, fileName);

    const player = html.match(/<video\b[^>]*>/i)?.[0] || '';
    assert(/\bcontrols\b/i.test(player) && /\bplaysinline\b/i.test(player), 'Video must expose inline controls');
    assert(!/\bautoplay\b/i.test(player), 'Video must wait for user input');
    assert(!/<track\b[^>]*\bdefault\b/i.test(html), 'Burned-in and external captions would overlap');
    for (const path of [video.src, video.caption, video.poster]) {
      assert(html.includes('="' + path + '"'), 'Video asset missing: ' + path);
    }
    if (video.kind === 'ai-narrated-still-preview') {
      const disclosure = lang === 'en' ? 'AI-narrated introduction preview' : 'AI 음성으로 제작한 소개 영상 미리보기';
      assert(html.includes(disclosure), 'Missing AI narration disclosure');
    }
    const plain = html.replace(/&#(?:39|x27);|&apos;/gi, "'").replace(/&amp;/g, '&');
    for (const paragraph of transcript.trim().split(/\r?\n\s*\r?\n/)) {
      assert(plain.includes(paragraph.trim()), 'Missing transcript paragraph on ' + fileName);
    }
  }
  console.log('Verified docs/ against a fresh build; checked both pages, links, media, captions and transcript (' + publishedFiles.length + ' public files).');
} finally {
  await rm(output, { recursive: true, force: true });
}
