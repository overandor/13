'use client';

import { useState } from 'react';

type TerminalResult = {
  ok: boolean;
  command?: string;
  executed?: string;
  startedAt?: string;
  finishedAt?: string;
  stdout?: string;
  stderr?: string;
  error?: string;
};

const commands = [
  { id: 'date', label: 'date' },
  { id: 'pwd', label: 'pwd' },
  { id: 'ls', label: 'ls -la' },
  { id: 'node', label: 'node -v' },
  { id: 'npm', label: 'npm -v' },
  { id: 'whoami', label: 'whoami' },
  { id: 'uname', label: 'uname -a' }
];

export default function TerminalPanel() {
  const [selected, setSelected] = useState('date');
  const [history, setHistory] = useState<TerminalResult[]>([]);
  const [running, setRunning] = useState(false);

  async function runCommand() {
    setRunning(true);
    try {
      const response = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: selected })
      });
      const data = await response.json();
      setHistory((items) => [data, ...items].slice(0, 12));
    } catch (error: any) {
      setHistory((items) => [
        { ok: false, error: error?.message || 'Request failed' },
        ...items
      ].slice(0, 12));
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-orange-500/20 bg-black p-5 shadow-xl shadow-orange-950/40">
      <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
        <h2 className="text-xl font-bold text-orange-200">Real Restricted Terminal</h2>
        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs text-orange-200">live-safe</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          className="flex-1 rounded-2xl border border-orange-500/20 bg-zinc-950 px-4 py-3 text-orange-100 outline-none"
        >
          {commands.map((command) => (
            <option key={command.id} value={command.id}>{command.label}</option>
          ))}
        </select>
        <button
          onClick={runCommand}
          disabled={running}
          className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-black disabled:opacity-60"
        >
          {running ? 'Running...' : 'Run command'}
        </button>
      </div>

      <p className="mt-3 text-xs text-orange-100/60">
        This executes real commands on the server runtime, but only from a fixed allowlist. It is not an open public shell.
      </p>

      <div className="mt-5 space-y-4 font-mono text-sm text-orange-100/80">
        {history.length === 0 ? (
          <p>$ choose a command and run it</p>
        ) : history.map((item, index) => (
          <div key={index} className="rounded-2xl border border-orange-500/10 bg-zinc-950 p-4">
            <p className="text-orange-300">$ {item.executed || item.command || 'blocked'}</p>
            {item.error ? <p className="mt-2 text-red-300">error: {item.error}</p> : null}
            {item.stdout ? <pre className="mt-2 whitespace-pre-wrap text-orange-100/80">{item.stdout}</pre> : null}
            {item.stderr ? <pre className="mt-2 whitespace-pre-wrap text-yellow-200/80">{item.stderr}</pre> : null}
            {item.finishedAt ? <p className="mt-2 text-xs text-orange-100/40">finished: {item.finishedAt}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
