import local from './local'
import devConfig from './development'
import prodConfig from './production'
import stagingConfig from './staging'

const environment = NODE_ENV

console.log(environment)

const dev = environment === 'development'

const defaults = {
  dev,
  environment
}

const rootConfig = {
  ...defaults,
  ...local
}

let config = devConfig
if (environment === 'production') {
  config = prodConfig
} else if (environment === 'staging') {
  config = stagingConfig
}

if (!dev) {
  console.log = () => {}
  console.table = () => {}
}

export default {
  ...rootConfig,
  ...config
}
