import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.cwd());
const startingPort = Number(process.env.PORT || 3000);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
};

const server = createServer(async (request, response) => {
  try {
    const requestPath = request.url === '/' ? '/index.html' : request.url;
    const filePath = join(root, requestPath);
    const fileContent = await readFile(filePath);
    const fileType = contentTypes[extname(filePath)] || 'application/octet-stream';

    response.writeHead(200, { 'Content-Type': fileType });
    response.end(fileContent);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

let currentPort = startingPort;

const listen = () => {
  server.listen(currentPort, () => {
    console.log(`TitanCrest dev server running at http://localhost:${currentPort}`);
  });
};

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    currentPort += 1;
    listen();
    return;
  }

  throw error;
});

listen();