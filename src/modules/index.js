import { combineReducers } from 'redux'
import global from './global'
import theme from './theme'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export default (history) => combineReducers({
  theme,
  global,
  router: connectRouter(history)
})
