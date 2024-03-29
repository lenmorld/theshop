import Document, { Html, Head, Main, NextScript } from "next/document"

/**
 * https://nextjs.org/docs/advanced-features/custom-document
 */

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="portal" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
