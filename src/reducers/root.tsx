import { combineReducers } from 'redux';
import { NODE, EDGE } from '../actions/action-types';
import NODE_T from '../types/NODE_T';
import EDGE_T from '../types/EDGE_T';
import { ControlsConstants } from '../Controls-Constants';
import STATE_T from '../types/STATE_T'
import * as uuid from 'uuid'
import * as dcopy from 'deep-copy'

const initialState = {
	nodes: {},
	edges: {},
	currentMode: () => { },
	controlsSelected: ControlsConstants.NONE,
	drawingLine: {node1Selected: false, node1: undefined, node2: undefined}
}

export const reducer = (state: STATE_T = initialState, action: any) => {
	switch (action.type) {
		case 'MODE_CHANGE': {
			// changes the function that is called when clicking on the canvas
			state = { ...state, currentMode: action.payload.newFunction, controlsSelected: action.payload.controlsSelected };
			break;
		}
		case EDGE.ADD: {
			const payload: MouseEvent = action.payload
			let nodeSelected = selectedNode(state.nodes, payload);
			if (nodeSelected) {
				if(state.drawingLine.node1Selected) {
					if (nodeSelected !== state.drawingLine.node1) { // same node selected
						action.payload = { from: state.drawingLine.node1 , to: nodeSelected, id: uuid.v4() }
					}
				}
				else {
					state = {...state,  drawingLine: { node1Selected: true, node1: nodeSelected, node2: undefined}}
					break;
				}
			}
			else {
				console.log('a node was not clicked')
				break;
			}
		}
		case EDGE.ADD_ID: { // {from, to, id}
			const payload: EDGE_T = action.payload;
			state = dcopy(state)
			state.nodes[payload.from].edges = [...state.nodes[payload.from].edges, (payload.id)];
			state.nodes[payload.to].edges = [...state.nodes[payload.to].edges, payload.id]
			state.edges[payload.id] = payload
			state.drawingLine.node1Selected = false; state.drawingLine.node1 = undefined;
			break;
		}
		case EDGE.DELETE: {
			if (action.payload.id in state.edges) {
				// make a new copy of state
				state = dcopy(state)

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
		}
		case EDGE.ERROR: {
			break;
		}
		case NODE.ADD: {
			state = dcopy(state)
			state.nodes[action.payload.id] = action.payload;
			break;
		}
		case NODE.DELETE: {
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
		}
		case NODE.DELETE_ID: {
			state = dcopy(state)

			// for each edge in the node to delete
			state.nodes[action.payload.id].edges.map((key) => {
				state.nodes[state.edges[key].from].edges = removeEdgeIDfromArrayOfEdgeID( state.nodes[state.edges[key].from].edges , key)
				state.nodes[state.edges[key].to].edges = removeEdgeIDfromArrayOfEdgeID( state.nodes[state.edges[key].to].edges , key)
				// now delete that key from the edges
				delete state.edges[key]

			})
			delete state.nodes[action.payload.id];
			break;
		}
		case NODE.ERROR: {
			console.error(action.payload.error);
			break;
		}
	}
	return state;
};

function pointInCircle(x, y, cx, cy, radius) {
	var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
	return distancesquared <= radius * radius;
}

function selectedNode(nodes, e: MouseEvent) {
	return Object.keys(nodes).filter(key => {
		return pointInCircle(
			e.pageX,
			e.pageY,
			nodes[key].x,
			nodes[key].y,
			25
		);
	})[0];
}

function removeEdgeIDfromArrayOfEdgeID(edgeIDs, edgeID) {
	return edgeIDs.filter(element => element !== edgeID)
}
