import * as React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import Line from './Line'
import { addVertex, deleteVertex } from '../actions/nodeActions'
import { addEdge, deleteEdge } from '../actions/edgeActions'

function mapStateToProps(state: {nodes: Object, edges: Object}) {
  return {nodes: state.nodes, edges: state.edges} as {nodes: Object, edges: Object}
}

function mapDispatchToProps (dispatch) {
  return {
    addVertex: (e: MouseEvent) => {
      dispatch(addVertex(e.pageX, e.pageY))
    },
    deleteVertex: (e: MouseEvent) => {
      dispatch(deleteVertex(e.pageX, e.pageY))
    }
  }
}

class Canvas extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.renderNode = this.renderNode.bind(this)
    // this.renderEdge = this.renderEdge.bind(this)
    // this.renderNodes = this.renderNodes.bind(this)
    // this.renderEdges = this.renderEdges.bind(this)
  }

  renderNode (node: any) {
    const style = {
      position: 'absolute' as 'absolute', // ?? A bug maybe
      height: 50,
      width: 50,
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: '#D32F2F',
      top: (node.y - 25).toString() + 'px',
      left: (node.x - 25).toString() + 'px',
      //zIndex: 3,
    }
    return <Paper key={node.id} zDepth={1} style={style} circle={true} />
  }

  renderEdge (edge: any) {
    return <Line key={edge.id} from={{x: this.props.nodes[edge.from].x, y: this.props.nodes[edge.from].y}} to={{x: this.props.nodes[edge.to].x, y: this.props.nodes[edge.to].y}} style='5px solid orange'/>
  }

  render () {
    let that = this
    const nodeKeys = Object.keys(this.props.nodes)
    const edgeKeys = Object.keys(this.props.edges)
    return (<div id='canvas' style={{'height': '100vh'}} onClick={this.props.addVertex}>
      {nodeKeys.map((key) => {return this.renderNode(this.props.nodes[key])})}
      {edgeKeys.map((key) => {return this.renderEdge(this.props.edges[key])})}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
