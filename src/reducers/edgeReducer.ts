import { EDGE } from '../actions/action-types'
export default (state: any = {edges: []}, action: any) => {
  switch (action.type) {
    case (EDGE.ADD):
      state = {...state, edges: state.edges.concat(action.payload)}
      break;
    case (EDGE.DELETE):
      state = {...state, edges: state.edges.filter((edge) => edge.id != action.payload.id)}
      break;
    case (EDGE.ERROR):
      break;
  }
  return state;
}
