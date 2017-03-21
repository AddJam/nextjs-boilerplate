import Reactotron, { trackGlobalErrors } from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'
import apisaucePlugin from 'reactotron-apisauce'
import sagaPlugin from 'reactotron-redux-saga'
import config from './'

const configureReactotron = () => {
  if (!config.dev) {
    return null
  }

  const tron = Reactotron
    .configure({name: 'Workfinder'})
    .use(trackGlobalErrors())
    .use(apisaucePlugin())
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect()

  const log = console.log
  console.log = function () {
    const args = arguments || []
    tron.log.apply(this, args)
    log.apply(this, args)
  }
  return tron
}

const reactotronInstance = configureReactotron()
export default reactotronInstance
