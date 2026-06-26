import { VERIFIED_CONTRACTS } from "../../data";
import type { VerifiedContract } from "../../types";

const NETWORK_COLORS: Record<string, string> = {
  "BNB Chain": "text-amber-400 bg-amber-400/5 border-amber-400/10",
  Ethereum: "text-blue-400 bg-blue-400/5 border-blue-400/10",
  Solana: "text-purple-400 bg-purple-400/5 border-purple-400/10",
  Arbitrum: "text-cyan-400 bg-cyan-400/5 border-cyan-400/10",
};

export default function ContractTable() {
  if (VERIFIED_CONTRACTS.length === 0) {
    return (
      <div className="text-center text-slate-500 text-sm font-mono py-12">
        No verified contracts available.
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#1e293b]/60">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="bg-brand-950/60 border-b border-[#1e293b]/40">
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Network</th>
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Verified Contract Address</th>
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Implementation Pattern</th>
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Logic Version / Standard</th>
            </tr>
          </thead>
          <tbody>
            {VERIFIED_CONTRACTS.map((c: VerifiedContract) => (
              <tr key={c.address} className="border-b border-[#1e293b]/30 last:border-b-0 hover:bg-brand-900/20 transition-colors">
                <td className="px-5 py-4">
                  <span
                    className={`inline-block text-[11px] font-mono px-2.5 py-1 rounded border ${NETWORK_COLORS[c.network] ?? "text-slate-400 bg-slate-400/5 border-slate-400/10"}`}
                  >
                    {c.network}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <a
                    href="https://asterdexhub.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-300 hover:text-sky-200 underline underline-offset-2 decoration-sky-500/30 transition-colors text-xs break-all"
                  >
                    {c.address}
                  </a>
                </td>
                <td className="px-5 py-4 text-slate-300 text-xs">{c.implementationPattern}</td>
                <td className="px-5 py-4 text-slate-400 text-xs">{c.logicVersion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {VERIFIED_CONTRACTS.map((c: VerifiedContract) => (
          <div
            key={c.address}
            className="bg-brand-900/35 border border-[#1e293b]/60 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-mono px-2.5 py-1 rounded border ${NETWORK_COLORS[c.network] ?? "text-slate-400 bg-slate-400/5 border-slate-400/10"}`}
              >
                {c.network}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Verified Address</span>
              <a
                href="https://asterdexhub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:text-sky-200 underline underline-offset-2 decoration-sky-500/30 transition-colors text-xs font-mono break-all"
              >
                {c.address}
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono mb-0.5">Pattern</span>
                <span className="text-slate-300 text-xs font-mono">{c.implementationPattern}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono mb-0.5">Version</span>
                <span className="text-slate-400 text-xs font-mono">{c.logicVersion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
