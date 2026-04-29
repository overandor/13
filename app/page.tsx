export default function Home() {
  const sessionId = 'demo-session-0429';
  const logs = [
    '$ sandbox created: friend-link-terminal-agent',
    '$ policy loaded: safe demo commands only',
    '$ llm request: create app scaffold',
    '$ generated files: README, proof manifest, UI shell',
    '$ artifact status: ready for Vercel preview'
  ];

  return (
    <main className="min-h-screen bg-[#070707] text-orange-50 px-5 py-6 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-zinc-950 via-black to-orange-950/30 p-6 shadow-2xl shadow-orange-900/30">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-300/80">Friend-Link Terminal Agent</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Send a link. Open an AI terminal sandbox.</h1>
          <p className="mt-5 max-w-3xl text-lg text-orange-100/75">
            A phone-first web gateway where a friend can use an LLM-controlled terminal inside a temporary, permissioned sandbox. This MVP is intentionally safe: it simulates execution, logs actions, and proves the product flow before exposing any real shell.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-black/50 p-5 shadow-[inset_8px_8px_18px_rgba(0,0,0,0.8),inset_-8px_-8px_18px_rgba(255,115,0,0.08)]">
              <h2 className="font-bold text-orange-200">Share Link</h2>
              <p className="mt-2 text-sm text-orange-100/70">Create an expiring session URL for a friend, contractor, or collaborator.</p>
            </div>
            <div className="rounded-3xl bg-black/50 p-5 shadow-[inset_8px_8px_18px_rgba(0,0,0,0.8),inset_-8px_-8px_18px_rgba(255,115,0,0.08)]">
              <h2 className="font-bold text-orange-200">Sandbox Terminal</h2>
              <p className="mt-2 text-sm text-orange-100/70">Run only approved commands inside disposable infrastructure, never on your real machine.</p>
            </div>
            <div className="rounded-3xl bg-black/50 p-5 shadow-[inset_8px_8px_18px_rgba(0,0,0,0.8),inset_-8px_-8px_18px_rgba(255,115,0,0.08)]">
              <h2 className="font-bold text-orange-200">Proof Export</h2>
              <p className="mt-2 text-sm text-orange-100/70">Export session logs, generated files, hashes, and a buyer-ready proof report.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-[2rem] border border-orange-500/20 bg-zinc-950/80 p-5 shadow-xl shadow-black">
            <h2 className="text-xl font-bold text-orange-200">Session Control</h2>
            <div className="mt-4 rounded-2xl bg-black p-4 text-sm text-orange-100/80">
              <p><span className="text-orange-400">Session:</span> {sessionId}</p>
              <p><span className="text-orange-400">Mode:</span> Safe mock terminal</p>
              <p><span className="text-orange-400">Permission:</span> Builder demo, no secrets, no real shell</p>
              <p><span className="text-orange-400">Expiry:</span> 60 minutes after creation</p>
            </div>
            <button className="mt-5 w-full rounded-2xl bg-orange-500 px-5 py-4 font-black text-black shadow-[8px_8px_22px_rgba(0,0,0,0.8),-8px_-8px_22px_rgba(255,115,0,0.16)]">Generate Friend Link</button>
            <p className="mt-4 text-sm text-orange-100/60">Production version connects this button to session creation, tokenized permissions, container launch, and audit logs.</p>
          </section>

          <section className="rounded-[2rem] border border-orange-500/20 bg-black p-5 shadow-xl shadow-orange-950/40">
            <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
              <h2 className="text-xl font-bold text-orange-200">Terminal Stream</h2>
              <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs text-orange-200">mock-safe</span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-sm text-orange-100/80">
              {logs.map((log) => <p key={log}>{log}</p>)}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
