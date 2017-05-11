import { store } from './store/store'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {MuiThemeProvider, lightBaseTheme} from "material-ui/styles"


import Canvas from './components/Canvas'
import Controls from './components/Controls'
import * as nodeActions from './actions/nodeActions'
import * as edgeActions from './actions/edgeActions'
const lightMuiTheme = getMuiTheme(lightBaseTheme);

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    <Provider store={store}>
      <div>
        <Controls />
        <Canvas />
      </div>
    </Provider>
  </MuiThemeProvider>
, document.getElementById('react-root'))

// 
// store.dispatch(nodeActions.addVertex(100, 200))
// store.dispatch(nodeActions.addVertex(300, 150))
// store.dispatch(nodeActions.addVertex(800, 675))
//
// store.dispatch(edgeActions.addEdge(Object.keys(store.getState().nodes).map(function (key) {return store.getState().nodes[key]})[0], Object.keys(store.getState().nodes).map(function (key) {return store.getState().nodes[key]})[1]))
// store.dispatch(edgeActions.addEdge(Object.keys(store.getState().nodes).map(function (key) {return store.getState().nodes[key]})[1], Object.keys(store.getState().nodes).map(function (key) {return store.getState().nodes[key]})[2]))
// // setTimeout(() => {store.dispatch(nodeActions.deleteVertex(300,150))}, 2000)
// store.dispatch(nodeActions.addVertex(100, -1))
