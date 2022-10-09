import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Concert+One&display=swap'
          rel='stylesheet'
        />
        <link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
