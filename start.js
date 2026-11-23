const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

// Ensure backend .env exists, copy .env.example if missing
const backendEnv = path.join(backendDir, '.env');
const backendEnvExample = path.join(backendDir, '.env.example');
if (!fs.existsSync(backendEnv) && fs.existsSync(backendEnvExample)) {
  fs.copyFileSync(backendEnvExample, backendEnv);
  console.log('[Runner] Provisioned backend/.env from .env.example');
}

console.log('[Runner] Starting ACANS 2026 Application services...');

// 1. Start Backend Express API on port 5001
const backendPort = process.env.PORT_BACKEND || '5001';
const backendProcess = spawn(process.execPath, ['src/server.js'], {
  cwd: backendDir,
  env: {
    ...process.env,
    PORT: backendPort,
  },
  stdio: 'inherit',
});

backendProcess.on('error', (err) => {
  console.error('[Backend Error]', err);
});

// 2. Start Frontend Next.js on 0.0.0.0:3000 (required by MilesWeb Proxy)
const frontendPort = process.env.PORT || '3000';
const nextBin = path.join(frontendDir, 'node_modules', 'next', 'dist', 'bin', 'next');

const frontendProcess = spawn(process.execPath, [nextBin, 'start', '-H', '0.0.0.0', '-p', frontendPort], {
  cwd: frontendDir,
  env: {
    ...process.env,
    PORT: frontendPort,
  },
  stdio: 'inherit',
});

frontendProcess.on('error', (err) => {
  console.error('[Frontend Error]', err);
});

// Graceful termination handling
const shutdown = (signal) => {
  console.log(`[Runner] Received ${signal}. Terminating child processes...`);
  try { backendProcess.kill('SIGTERM'); } catch (e) {}
  try { frontendProcess.kill('SIGTERM'); } catch (e) {}
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

backendProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`[Runner] Backend stopped with code ${code}`);
  }
});

frontendProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`[Runner] Frontend stopped with code ${code}`);
  }
});
