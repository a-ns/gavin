import { NODE , EDGE } from '../actions/action-types'
import * as uuid from 'uuid'

function pointInCircle(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}

interface Action {
  type: String,
  payload?: {x:Number, y:Number, id?: String},
}



export default (state: any = {hoveredNode: String, selectedNodes: [String], nodes: [{x: 500, y: 500, id: uuid.v4()}]}, action: Action) => {
  switch (action.type) {
    case (NODE.ADD):
      state = {...state, nodes: state.nodes.concat(action.payload)}
      break;
    case (NODE.DELETE):
      const nodes = state.nodes.filter((node) => !pointInCircle(action.payload.x, action.payload.y, node.x, node.y, 25))
      state = {...state, nodes}
      break;
    case (NODE.ERROR):
      break;
  }
  return state;
}
