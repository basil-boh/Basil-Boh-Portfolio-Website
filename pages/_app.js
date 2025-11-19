import '@/styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Basil Boh | Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <Script src="https://unpkg.com/@phosphor-icons/web" strategy="afterInteractive" />
      <Component {...pageProps} />
    </>
  )
}

