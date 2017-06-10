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
import {ControlsConstants} from '../Controls-Constants'
import { addEdge, deleteEdge } from '../actions/edgeActions';
function mapStateToProps(state) {
	return {
		controlsSelected: state.controlsSelected
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

	}

	render() {
		return (
			<Drawer open={true}>
				<MenuItem style={this.getStyle(ControlsConstants.NODE.ADD)} onClick={this.changeAddVertex.bind(this)}>Add Vertices</MenuItem>
				<MenuItem style={this.getStyle(ControlsConstants.EDGE.ADD)}>Add Edges</MenuItem>
				<MenuItem style={this.getStyle(ControlsConstants.NONE)} onClick={this.changeDoNothing.bind(this)}>No Choice</MenuItem>
			</Drawer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
