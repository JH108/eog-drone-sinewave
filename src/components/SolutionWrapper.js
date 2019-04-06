import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import Grid from '@material-ui/core/Grid';
import Drone from './Drone';
import SineWave from './SineWave';

class SolutionWrapper extends Component {
	componentDidMount() {
		this.props.onLoad();
	}
	render() {
		const { loading, lastPosition, temperatures } = this.props;
		console.log('lastPosition', lastPosition);
		return (
			<Grid container>
				<Grid item xs={6}>
					<Drone loading={loading} lastPosition={lastPosition} />
				</Grid>
				<Grid item xs={6}>
					<SineWave
						margin={50}
						width={525}
						height={270}
						loading={loading}
						temperatures={temperatures}
					/>
				</Grid>
			</Grid>
		);
	}
}

const mapState = (state, ownProps) => {
	const { loading, droneData } = state.drone;
	// Using default for lastPosition since droneData could be an empty array
	return {
		loading,
		lastPosition: droneData.slice(-1)[0] || {},
		temperatures: droneData.map((point) => ({
			temp: point.metric,
			time: new Date(point.timestamp),
		})),
	};
};

const mapDispatch = (dispatch) => ({
	onLoad: () =>
		dispatch({
			type: actions.FETCH_DRONE_DATA,
		}),
});

export default connect(
	mapState,
	mapDispatch,
)(SolutionWrapper);
