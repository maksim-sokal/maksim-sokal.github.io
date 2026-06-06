import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RECENT_AUDITS } from "../../data";
import type { AuditLog } from "../../types";

export default function AuditAccordion() {
  const [expandedAudit, setExpandedAudit] = useState<string | null>(null);

  const toggleAudit = (id: string) => {
    setExpandedAudit((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {RECENT_AUDITS.map((audit: AuditLog) => {
        const isOpen = expandedAudit === audit.id;
        return (
          <div
            key={audit.id}
            className="bg-brand-900/35 border border-[#1e293b]/60 rounded-xl p-6 hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-sky-400 bg-sky-400/5 px-2.5 py-1 rounded border border-sky-400/10">
                  {audit.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {audit.date}
                </span>
              </div>

              <h3 className="font-display font-medium text-slate-100 text-lg mb-1 tracking-tight">
                {audit.protocol}
              </h3>

              <div className="grid grid-cols-2 gap-4 my-4 font-mono text-xs bg-[#090e18] p-3 rounded-lg border border-slate-800/50">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Audited TVL</span>
                  <span className="text-slate-200 font-semibold">{audit.tvl}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Security Rating</span>
                  <span className="text-emerald-400 font-bold">{audit.score}/100</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs mb-4 leading-relaxed font-sans">
                {audit.description}
              </p>
            </div>

            <div className="border-t border-[#1e293b]/40 pt-4 mt-2">
              <button
                onClick={() => toggleAudit(audit.id)}
                aria-expanded={isOpen}
                aria-controls={`${audit.id}-detail`}
                className="w-full flex justify-between items-center text-xs font-mono text-sky-300 hover:text-sky-200 cursor-pointer transition-colors"
              >
                <span>{isOpen ? "Hide critical finding log" : "View diagnostic vulnerability detail"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`${audit.id}-detail`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-3 bg-brand-950/60 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-w-full overflow-x-auto">
                      <h5 className="text-[9px] text-sky-400 uppercase tracking-widest mb-1 font-bold">Trace Check:</h5>
                      <span className="block whitespace-pre-wrap">{audit.findingsCode}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
