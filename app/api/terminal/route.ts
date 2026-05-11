import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const execFileAsync = promisify(execFile);

const ALLOWED: Record<string, { cmd: string; args: string[]; label: string }> = {
  date: { cmd: 'date', args: [], label: 'Show server date' },
  pwd: { cmd: 'pwd', args: [], label: 'Show working directory' },
  ls: { cmd: 'ls', args: ['-la'], label: 'List runtime files' },
  node: { cmd: 'node', args: ['-v'], label: 'Show Node version' },
  npm: { cmd: 'npm', args: ['-v'], label: 'Show npm version' },
  whoami: { cmd: 'whoami', args: [], label: 'Show runtime user' },
  uname: { cmd: 'uname', args: ['-a'], label: 'Show runtime kernel' }
};

export async function GET() {
  return Response.json({
    ok: true,
    mode: 'real-restricted-terminal',
    commands: Object.entries(ALLOWED).map(([id, item]) => ({ id, label: item.label })),
    warning: 'This endpoint executes real commands, but only from a fixed allowlist. It is not an open shell.'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const command = String(body.command || '').trim();
    const selected = ALLOWED[command];

    if (!selected) {
      return Response.json(
        { ok: false, error: 'Command not allowed', allowed: Object.keys(ALLOWED) },
        { status: 400 }
      );
    }

    const startedAt = new Date().toISOString();
    const result = await execFileAsync(selected.cmd, selected.args, {
      timeout: 4000,
      maxBuffer: 1024 * 64,
      env: {
        PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin'
      }
    });

    return Response.json({
      ok: true,
      command,
      executed: [selected.cmd, ...selected.args].join(' '),
      startedAt,
      finishedAt: new Date().toISOString(),
      stdout: result.stdout,
      stderr: result.stderr || ''
    });
  } catch (error: any) {
    return Response.json(
      {
        ok: false,
        error: error?.message || 'Terminal execution failed',
        stdout: error?.stdout || '',
        stderr: error?.stderr || ''
      },
      { status: 500 }
    );
  }
}
