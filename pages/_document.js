import Document, { Head, Main, NextScript } from 'next/document'
import { renderStatic } from 'glamor/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, store }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return { ...page, ...styles, store }
  }

  constructor (props) {
    super(props)
    const { __NEXT_DATA__, ids, store } = props
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids
    }

    __NEXT_DATA__.redux = store.getState()
  }

  render () {
    return (
      <html>
        <Head>
          <title>My page</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
