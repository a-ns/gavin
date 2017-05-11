import { NODE } from './action-types'
import * as uuid from 'uuid'
export function addVertex(x: Number, y: Number) {
  if (x < 0 || y < 0)
    return { type: NODE.ERROR, payload: {error: 'Argument out of range'}}
  return {
    type: NODE.ADD,
    payload: {
      x: x,
      y: y,
      id: uuid.v4()
    }
  }
}

export function deleteVertex(x: Number, y: Number) {
  if (x < 0 || y < 0)
    return { type: NODE.ERROR, payload: {error: 'Argument out of range'}}
  return {
    type: NODE.DELETE,
    payload: {
      x: x,
      y: y,
    }
  }
}

export function deleteVertexById(id: String) {
  return {
    type: NODE.DELETE+'_ID',
    payload: {
      id
    }
  }
}
