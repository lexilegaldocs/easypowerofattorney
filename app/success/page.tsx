'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const params = useSearchParams();
  const sid = params.get("sid");
  const session_id = params.get("session_id");
  const [message, setMessage] = useState("Verifying payment...");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      const res = await fetch(`/api/fulfil?sid=${sid}&session_id=${session_id}`);
      const j = await res.json();
      if (j.ok && j.url) { setMessage("All set! Your LPA pack is ready."); setDownloadUrl(j.url); }
      else setMessage(j.error || "We couldn't verify your payment. Please contact support.");
    }
    if (sid && session_id) run();
  }, [sid, session_id]);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Thank you</h1>
      <p className="mt-2">{message}</p>
      {downloadUrl && <a className="btn mt-6 inline-block" href={downloadUrl}>Download your LPA pack</a>}
    </div>
  );
}
