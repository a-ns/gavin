import { combineReducers } from 'redux'
// import  nodeReducer  from './nodeReducer'
// import edgeReducer from './edgeReducer'

function pointInCircle(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}

import { NODE , EDGE } from '../actions/action-types'
export const reducer = (state: {nodes: Object, edges: Object, currentMode: Function} = {nodes: {}, edges: {}, currentMode: () => {}}, action: any) => {
  switch (action.type) {
    case ('CHANGEMODE'):
      // changes the function that is called when clicking on the canvas
      state = {...state, currentMode: action.payload}
      break;
    case (EDGE.ADD):
      state = {...state, edges: {...state.edges}}
      state.edges[action.payload.id] = action.payload
      break;
    case (EDGE.DELETE):
      if (action.payload.id in state.edges) {
        state = {...state}
        delete state.edges[action.payload.id]
      }
      break;
    case (EDGE.ERROR):
      break;
    case (NODE.ADD):
      state = {...state, nodes: {...state.nodes }}
      state.nodes[action.payload.id] = action.payload
      break;
    case (NODE.DELETE):
      let nodeToRemove = Object.keys(state.nodes).filter((key) => {

        return (pointInCircle(action.payload.x, action.payload.y, state.nodes[key].x, state.nodes[key].y, 25))
      })[0]
      if(!nodeToRemove) break;
      action.payload.id = nodeToRemove
    case (NODE.DELETE_ID):
      state = {...state, nodes: {...state.nodes}, edges: {...state.edges}}
      delete state.nodes[action.payload.id]
      // delete any edges that contain this node
      Object.keys(state.edges).map((key) => {
        const edge = state.edges[key]
        const nodeToRemoveID = action.payload.id

        // Find each edge in state.edges that contain the nodes ID in edge.from || edge.to
        // and add it to an array
        let edgesToRemove = []
        if (edge.from === nodeToRemoveID || edge.to == nodeToRemoveID) {
          edgesToRemove.push(edge) // might be able to just delete right here instaed
        }
        // delete each of the found edges
        edgesToRemove.map((edge) => {delete state.edges[edge.id]})
      })
      break;
    case (NODE.ERROR):
      break;
  }
  return state;
}
// export const reducer = combineReducers({nodes: nodeReducer, edges: edgeReducer})
