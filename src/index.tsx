import {root} from '@lynx-js/react'

import React from 'react'
import {App} from './tests/App.js'

root.render(<App />)

//@ts-ignore
if (import.meta.webpackHot) {
  //@ts-ignore
  import.meta.webpackHot.accept()
}
