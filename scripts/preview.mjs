// Mirror the Pages project URL, including partial responses used by video players.
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../docs/', import.meta.url)));
const base = '/italki/';
const port = Number(process.argv[2] || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8', '.srt': 'text/plain; charset=utf-8',
  '.vtt': 'text/vtt; charset=utf-8', '.mp4': 'video/mp4', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
};

function byteRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2])) return null;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  return start <= end && start < size ? { start, end } : null;
}

await stat(join(root, 'index.html'));
const server = createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) {
      return res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/' || pathname === '/italki') return res.writeHead(302, { Location: base }).end();
    if (!pathname.startsWith(base)) return res.writeHead(404).end();
    const file = resolve(root, pathname.slice(base.length) || 'index.html');
    if (!file.startsWith(root + sep)) return res.writeHead(404).end();
    const info = await stat(file);
    if (!info.isFile()) return res.writeHead(404).end();

    const headers = {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Accept-Ranges': 'bytes',
      'Content-Length': info.size,
      'Cache-Control': 'no-store',
    };
    let range;
    if (req.headers.range) {
      range = byteRange(req.headers.range, info.size);
      if (!range) return res.writeHead(416, { 'Content-Range': 'bytes */' + info.size }).end();
      headers['Content-Length'] = range.end - range.start + 1;
      headers['Content-Range'] = 'bytes ' + range.start + '-' + range.end + '/' + info.size;
    }
    res.writeHead(range ? 206 : 200, headers);
    if (req.method === 'HEAD') return res.end();
    const stream = createReadStream(file, range);
    res.on('close', () => stream.destroy());
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 400).end();
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log('Local preview: http://127.0.0.1:' + port + base);
});
