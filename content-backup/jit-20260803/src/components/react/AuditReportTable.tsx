import { ExternalLink } from "lucide-react";
import { ASTER_AUDIT_REPORTS } from "../../data";
import type { AuditReport } from "../../types";

const AUDITOR_COLORS: Record<string, string> = {
  PeckShield: "text-rose-400 bg-rose-400/5 border-rose-400/10",
  "Salus Security": "text-cyan-400 bg-cyan-400/5 border-cyan-400/10",
  Halborn: "text-orange-400 bg-orange-400/5 border-orange-400/10",
};

export default function AuditReportTable() {
  if (ASTER_AUDIT_REPORTS.length === 0) {
    return (
      <div className="text-center text-slate-500 text-sm font-mono py-12">
        No audit reports available.
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#1e293b]/60">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="bg-brand-950/60 border-b border-[#1e293b]/40">
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Audited Component</th>
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Security Auditor</th>
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Focus of Assessment</th>
              <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-5 py-3 font-semibold">Report</th>
            </tr>
          </thead>
          <tbody>
            {ASTER_AUDIT_REPORTS.map((r: AuditReport) => (
              <tr key={r.id} className="border-b border-[#1e293b]/30 last:border-b-0 hover:bg-brand-900/20 transition-colors">
                <td className="px-5 py-4">
                  <span className="text-slate-100 text-xs font-semibold">{r.component}</span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-block text-[11px] font-mono px-2.5 py-1 rounded border ${AUDITOR_COLORS[r.auditor] ?? "text-slate-400 bg-slate-400/5 border-slate-400/10"}`}
                  >
                    {r.auditor}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">{r.focus}</td>
                <td className="px-5 py-4">
                  <a
                    href={r.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sky-300 hover:text-sky-200 underline underline-offset-2 decoration-sky-500/30 transition-colors text-xs"
                  >
                    View PDF
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {ASTER_AUDIT_REPORTS.map((r: AuditReport) => (
          <div
            key={r.id}
            className="bg-brand-900/35 border border-[#1e293b]/60 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-100 text-sm font-semibold font-sans">{r.component}</span>
              <span
                className={`text-[10px] font-mono px-2.5 py-1 rounded border ${AUDITOR_COLORS[r.auditor] ?? "text-slate-400 bg-slate-400/5 border-slate-400/10"}`}
              >
                {r.auditor}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono mb-0.5">Focus</span>
              <span className="text-slate-400 text-xs font-sans">{r.focus}</span>
            </div>
            <a
              href={r.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-300 hover:text-sky-200 underline underline-offset-2 decoration-sky-500/30 transition-colors text-xs font-mono"
            >
              View PDF
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
