import { isIE } from '@/utils/util'

if (process.env.NODE_ENV !== 'production') {
  if (isIE()) {
    console.error('ERROR: `mockjs` NOT SUPPORT `IE`.');
  }
  const Mock = require('mockjs2');
  require('./services/graph');

  Mock.setup({
    timeout: 200-600 // setter delay time
  })
}
