import { useEffect, useState } from 'react';

type Props = { sid: string | null; session_id: string | null };

// Force server-side render so no static pre-render happens
export async function getServerSideProps(ctx: any) {
  const sid = (ctx.query?.sid as string) || null;
  const session_id = (ctx.query?.session_id as string) || null;
  return { props: { sid, session_id } };
}

export default function Success({ sid, session_id }: Props) {
  const [message, setMessage] = useState('Verifying payment...');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
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
  }, [sid, session_id]);

  return (
    <div style={{ padding: '3rem 0' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Thank you</h1>
      <p style={{ marginTop: '0.5rem' }}>{message}</p>
      {downloadUrl && (
        <a
          href={downloadUrl}
          style={{
            marginTop: '1.5rem',
            display: 'inline-block',
            padding: '0.75rem 1rem',
            borderRadius: 8,
            border: '1px solid #ddd',
            textDecoration: 'none',
          }}
        >
          Download your LPA pack
        </a>
      )}
    </div>
  );
}
