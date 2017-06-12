import * as React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Line from './Line';
import NODE_T from '../types/NODE_T';
import EDGE_T from '../types/EDGE_T';

import {
	addVertex,
	deleteVertex,
	deleteVertexById
} from '../actions/nodeActions';
import { addEdge, deleteEdge } from '../actions/edgeActions';

function mapStateToProps(state: {
	nodes: object;
	edges: object;
	currentMode: Function;
	drawingLine: { isDrawing: boolean; node1: string; node2: string };
}) {
	return {
		nodes: state.nodes,
		edges: state.edges,
		currentMode: state.currentMode,
		drawingLine: { isDrawing: false }
	};
}

function mapDispatchToProps(dispatch) {
	return {
			deleteVertex: (id: string) => {
				dispatch(deleteVertexById(id));
			},
			deleteEdge: (id: string) => {
				dispatch(deleteEdge(id));
			}
	};
}

class Canvas extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.renderNode = this.renderNode.bind(this);
		this.renderEdge = this.renderEdge.bind(this);
	}

	renderNode(node: NODE_T) {
		const style = {
			position: 'absolute' as 'absolute', // ?? A bug maybe
			height: 50,
			width: 50,
			textAlign: 'center',
			//display: 'inline-block',
			backgroundColor: '#D32F2F',
			zIndex: 3,
			top: (node.y - 25).toString() + 'px',
			left: (node.x - 25).toString() + 'px'
		};
		return (
			<Paper
				key={node.id}
				zDepth={1}
				style={style}
				circle={true}
				onContextMenu={this.renderNodeDeleteVertexHelper.bind(this, node)}
			/>
		);
	}

	renderNodeDeleteVertexHelper(node: NODE_T) {
		// rather than using a lambda () => {} , everything after this in the bind call is passed as parameters to the binding method
		this.props.deleteVertex(node.id);
	}

	renderEdge(edge: EDGE_T) {
		return (
			<Line
				key={edge.id}
				from={{
					x: this.props.nodes[edge.from].x - 256,
					y: this.props.nodes[edge.from].y - 12
				}}
				to={{
					x: this.props.nodes[edge.to].x - 256,
					y: this.props.nodes[edge.to].y - 12
				}}
				style="7px solid orange"
				zIndex="2"
				onContextMenu={(e: any) => {
					e.preventDefault();
					this.props.deleteEdge(edge.id);
				}}
			/>
		);
	}

	render() {
		const nodeKeys = Object.keys(this.props.nodes);
		const edgeKeys = Object.keys(this.props.edges);
		return (
			<div
				id="canvas"
				style={{ margin: '0px 0px 0px 256px', height: '100vh' }}
				onClick={this.props.currentMode}
				onContextMenu={(e: any) => {
					e.preventDefault();
				}}
				onDrop={e => {
					e.preventDefault();
					console.log('canvas onDragOver');
				}}
			>
				{nodeKeys.map(key => {
					return this.renderNode(this.props.nodes[key]);
				})}
				{edgeKeys.map(key => {
					return this.renderEdge(this.props.edges[key]);
				})}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
