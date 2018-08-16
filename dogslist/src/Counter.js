/**
 * @author Kenneth Norris
 */

var React = require('react');

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: 0};
	}
	
	incrementCount() {
		this.setState({ count: this.state.count + 1 });
	}
	
	render() {
		return (
			<div> Count: { this.state.count }
				<button type="button" onClick={ this.incrementCount.bind(this) }>
					Increment
				</button>
			</div>
		);
	}
};

export default Counter;