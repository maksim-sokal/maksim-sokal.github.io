import { useState, useRef, useEffect } from "react";

interface Props {
  gpgKey: string;
}

export default function GpgCopyButton({ gpgKey }: Props) {
  const [copiedKey, setCopiedKey] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copyGpgKey = () => {
    if (!navigator.clipboard) {
      fallbackCopy(gpgKey);
      return;
    }
    navigator.clipboard.writeText(gpgKey).then(() => {
      setCopiedKey(true);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedKey(false), 2000);
    }).catch(() => {
      fallbackCopy(gpgKey);
    });
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopiedKey(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopiedKey(false), 2000);
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
