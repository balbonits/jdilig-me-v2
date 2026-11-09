import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found - John Dilig</title>
      </Head>
      <div className="s-container">
        <header className="s-page-head" style={{ paddingBottom: 96 }}>
          <h1 className="s-h1-inner">Page not found</h1>
          <p className="s-lede">That page doesn&apos;t exist or has moved.</p>
          <div className="s-pager" style={{ justifyContent: 'flex-start' }}>
            <Link className="s-standalone" href="/">Home</Link>
            <Link className="s-standalone" href="/projects">Work</Link>
          </div>
        </header>
      </div>
    </>
  );
}
