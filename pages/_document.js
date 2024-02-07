import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="global-loader.css" />
        </Head>
        <body>
          <div id="globalLoader">
            <div class="corners">
              <div class="corner corner--1"></div>
              <div class="corner corner--2"></div>
              <div class="corner corner--3"></div>
              <div class="corner corner--4"></div>
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
