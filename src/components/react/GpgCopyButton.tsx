import { useState } from "react";

interface Props {
  gpgKey: string;
}

export default function GpgCopyButton({ gpgKey }: Props) {
  const [copiedKey, setCopiedKey] = useState(false);

  const copyGpgKey = () => {
    navigator.clipboard.writeText(gpgKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <>
      <p className="text-[11px] font-mono text-sky-300 bg-brand-950 p-2.5 rounded border border-brand-800/35 overflow-x-auto tracking-wide">
        {gpgKey}
      </p>
      <div className="flex justify-between items-center pt-1">
        <span className="text-[9px] text-slate-500 font-mono">Use key to decrypt contract signages</span>
        <button
          onClick={copyGpgKey}
          className="text-[9px] font-mono text-sky-400 hover:text-sky-300 cursor-pointer bg-sky-500/5 px-2.5 py-1.5 rounded border border-sky-400/20"
        >
          {copiedKey ? "Copied Signature Key!" : "Copy GPG Public Key"}
        </button>
      </div>
    </>
  );
}
