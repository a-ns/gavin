import * as React from 'react';

export default class Line extends React.Component<any, any> {
	static propTypes = {
		from: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}),
		to: React.PropTypes.shape({
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired
		}),
		style: React.PropTypes.string,
		zIndex: React.PropTypes.string,
		onContextMenu: Function
	};

	render() {
		let from = this.props.from;
		let to = this.props.to;
		if (to.x < from.x) {
			from = this.props.to;
			to = this.props.from;
		}

		const len = Math.sqrt(
			Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)
		);
		const angle = Math.atan((to.y - from.y) / (to.x - from.x));
		const onContextMenu = this.props.onContextMenu;
		const style = {
			position: 'absolute' as 'absolute',
			transform: `translate(${from.x -
				0.5 * len * (1 - Math.cos(angle))}px, ${from.y +
				0.5 * len * Math.sin(angle)}px) rotate(${angle}rad)`,
			width: `${len}px`,
			height: `${0}px`,
			borderBottom: this.props.style || '1px solid black',
			zIndex: this.props.zIndex
		};

		return <div style={style} onContextMenu={onContextMenu} />;
	}
}
