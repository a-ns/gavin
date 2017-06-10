import { combineReducers } from 'redux';
import { NODE, EDGE } from '../actions/action-types';
import NODE_T from '../types/NODE_T';
import EDGE_T from '../types/EDGE_T';
import { ControlsConstants } from '../Controls-Constants';
interface State {
	nodes: object; // key-value, each key is the id of the node
	edges: object; // same thing
	currentMode: Function;
}

const initialState = {
	nodes: {},
	edges: {},
	currentMode: () => { console.log('hey my dude')},
	controlsSelected: ControlsConstants.NONE
} as State;

export const reducer = (state: State = initialState, action: any) => {
	switch (action.type) {
		case 'MODE_CHANGE':
			// changes the function that is called when clicking on the canvas
			state = { ...state, currentMode: action.payload.newFunction, controlsSelected: action.payload.controlsSelected };
			break;
		case EDGE.ADD: // {from, to, id}
			const payload: EDGE_T = action.payload;
			state = {
				...state,
				edges: { ...state.edges },
				nodes: { ...state.nodes }
			};
			state.nodes[payload.from].edges.push(payload.id);
			state.edges[payload.id] = payload;
			break;
		case EDGE.DELETE:
			if (action.payload.id in state.edges) {
				// make a new copy of state
				state = {
					...state,
					edges: { ...state.edges },
					nodes: { ...state.nodes }
				};

				// delete this edge from each node (edge.from.edges && edge.to.edges)
				// do the thing
				const edgeToDelete: EDGE_T = state.edges[action.payload.id];
				state.nodes[edgeToDelete.from].edges = state.nodes[edgeToDelete.from].edges.filter((edge: string) => {
					return edge !== edgeToDelete.id;
				})
				state.nodes[edgeToDelete.to].edges = state.nodes[edgeToDelete.to].edges.filter((edge: string) => {
					return edge !== edgeToDelete.id;
				})
				// delete this edge
				delete state.edges[action.payload.id];
			}
			break;
		case EDGE.ERROR:
			break;
		case NODE.ADD:
			state = {
				...state,
				nodes: { ...state.nodes }
			};
			state.nodes[action.payload.id] = action.payload;
			break;
		case NODE.DELETE:
			let nodeToRemove = Object.keys(state.nodes).filter(key => {
				return pointInCircle(
					action.payload.x,
					action.payload.y,
					state.nodes[key].x,
					state.nodes[key].y,
					25
				);
			})[0];
			if (!nodeToRemove) break;
			action.payload.id = nodeToRemove;
		case NODE.DELETE_ID:
			state = {
				...state,
				nodes: { ...state.nodes },
				edges: { ...state.edges }
			};
			delete state.nodes[action.payload.id];
			// delete any edges that contain this node
			Object.keys(state.edges).map(key => {
				const edge = state.edges[key];
				const nodeToRemoveID = action.payload.id;

				// Find each edge in state.edges that contain the nodes ID in edge.from || edge.to
				if (edge.from === nodeToRemoveID || edge.to == nodeToRemoveID) {
					delete state.edges[edge.id];
				}
			});
			break;
		case NODE.ERROR:
			console.error(action.payload.error);
			break;
	}
	return state;
};

function pointInCircle(x, y, cx, cy, radius) {
	var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
	return distancesquared <= radius * radius;
}

// export const reducer = combineReducers({nodes: nodeReducer, edges: edgeReducer})
