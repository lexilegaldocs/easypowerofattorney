'use client';

import { useEffect, useState } from 'react';

// Tell Next.js not to prerender this page
export const dynamic = 'force-dynamic';

export default function Success() {
  const [message, setMessage] = useState('Verifying payment...');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    // Avoid Next.js SSR issues by accessing window only on client
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('sid');
    const session_id = params.get('session_id');

    async function run() {
      try {
        if (!sid || !session_id) {
          setMessage('Missing checkout details. If you paid, please contact support.');
          return;
        }
        const res = await fetch(`/api/fulfil?sid=${sid}&session_id=${session_id}`);
        const j = await res.json();
        if (j.ok && j.url) {
          setMessage('All set! Your LPA pack is ready.');
          setDownloadUrl(j.url);
        } else {
          setMessage(j.error || "We couldn't verify your payment. Please contact support.");
        }
      } catch (e: any) {
        setMessage(e.message || 'Something went wrong.');
      }
    }
    run();
  }, []);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Thank you</h1>
      <p className="mt-2">{message}</p>
      {downloadUrl && (
        <a className="btn mt-6 inline-block" href={downloadUrl}>
          Download your LPA pack
        </a>
      )}
    </div>
  );
}
