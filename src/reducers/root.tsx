import { combineReducers } from 'redux'
// import  nodeReducer  from './nodeReducer'
// import edgeReducer from './edgeReducer'

function pointInCircle(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}

import { NODE , EDGE } from '../actions/action-types'
export const reducer = (state: {nodes: Object, edges: Object} = {nodes: {}, edges: {}}, action: any) => {
  switch (action.type) {
    case (EDGE.ADD):
      state = {...state, edges: {...state.edges}}
      state.edges[action.payload.id] = action.payload
      //state = {...state, edges: {...state.edges, action.payload.id: action.paylod}}
      break;
    case (EDGE.DELETE):
      if (action.payload.id in state.edges) {
        state = {...state}
        delete state.edges[action.payload.id]
      }
    //  state = {...state, edges: state.edges.filter((edge) => edge.id != action.payload.id)}
      break;
    case (EDGE.ERROR):
      break;
    case (NODE.ADD):
      state = {...state, nodes: {...state.nodes }}
      state.nodes[action.payload.id] = action.payload
  //    state = {...state, nodes: state.nodes.concat(action.payload)}
    //  break;
    case (NODE.DELETE):
      // delete any edges that contain this node
  //    const _node = state.nodes.filter((node) => pointInCircle(action.payload.x, action.payload.y, node.x, node.y, 25))[0]
  //    const edges = state.edges.filter((edge) => edge.from.id !== _node.id && edge.to.id !== _node.id)
  //    const nodes = state.nodes.filter((node) => node !== _node)
  //    state = {...state, edges, nodes}
      break;
    case (NODE.ERROR):
      break;
  }
  return state;
}
// export const reducer = combineReducers({nodes: nodeReducer, edges: edgeReducer})
