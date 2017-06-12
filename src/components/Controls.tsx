import * as React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { changeFunction } from '../actions/canvasActions'
import {
	addVertex,
	deleteVertex,
	deleteVertexById
} from '../actions/nodeActions';

import {
	addEdgeByClick
} from '../actions/edgeActions'
import {ControlsConstants} from '../Controls-Constants'
import { addEdge, deleteEdge } from '../actions/edgeActions';
import STATE_T from '../types/STATE_T'

function mapStateToProps (state: STATE_T) {
	return {
		controlsSelected: state.controlsSelected,
		drawingLine: state.drawingLine
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeFunction: (newFunction: Function, controlsSelected: string) => {
			dispatch(changeFunction(newFunction, controlsSelected))
		},
		dispatch
	}
}

class Controls extends React.Component<any, any> {
	getStyle(controlsSelected: string) {
		if (controlsSelected === this.props.controlsSelected) {
			return { color: '#00BCD4' };
		}
		return {};
	}

	changeAddVertex() {
		this.props.changeFunction((e: MouseEvent) => {
			this.props.dispatch(addVertex(e.pageX, e.pageY))
		}, ControlsConstants.NODE.ADD)
	}

	changeDoNothing() {
		this.props.changeFunction(() => {}, ControlsConstants.NONE)
	}

	changeAddEdge() {
		this.props.changeFunction((e: MouseEvent) => {
			this.props.dispatch(addEdgeByClick(e))
		}, ControlsConstants.EDGE.ADD)
	}

	render() {
		return (
			<Drawer open={true}>
				<MenuItem style={this.getStyle(ControlsConstants.NODE.ADD)} onClick={this.changeAddVertex.bind(this)}>Add Vertices</MenuItem>
				<MenuItem style={this.getStyle(ControlsConstants.EDGE.ADD)} onClick={this.changeAddEdge.bind(this)}>Add Edges</MenuItem>
				<MenuItem style={this.getStyle(ControlsConstants.NONE)} onClick={this.changeDoNothing.bind(this)}>No Choice</MenuItem>
			</Drawer>
		);
	}
}

function pointInCircle(x, y, cx, cy, radius) {
	var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
	return distancesquared <= radius * radius;
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
