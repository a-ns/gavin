import * as React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'


export default class Controls extends React.Component<any, any>{

  getStyle (menuChoice: number) {
    if (menuChoice === this.props.mode) {
      return {'color': '#00BCD4'}
    }
    return {}
  }

  render() {
    return (
        <Drawer open={true}>
          <MenuItem style={this.getStyle(-1)}>Add Vertices</MenuItem>
          <MenuItem style={this.getStyle(-1)}>Delete Vertices</MenuItem>
          <MenuItem style={this.getStyle(-1)}>Add Edges</MenuItem>
          <MenuItem style={this.getStyle(-1)}>No Choice</MenuItem>
        </Drawer>
    );
  }
}
