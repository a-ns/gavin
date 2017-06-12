interface State_T {
	nodes: object; // key-value, each key is the id of the node
	edges: object; // same thing
	currentMode: Function;
	controlsSelected: string;
	drawingLine: { node1Selected: boolean, node1: string, node2: string}
}

export default State_T
