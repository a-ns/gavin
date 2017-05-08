import { EDGE } from './action-types'
import * as uuid from 'uuid'
import NODE_T from '../types/NODE_T'
import EDGE_T from '../types/EDGE_T'


export function addEdge(from: NODE_T, to: NODE_T) {
  return {
    type: EDGE.ADD,
    payload: {
      from: from.id,
      to: to.id,
      id: uuid.v4()
    } as EDGE_T
  }
}
export function deleteEdge(id: String) {
  return {
    type: EDGE.DELETE,
    payload: {
      id
    }
  }
}
