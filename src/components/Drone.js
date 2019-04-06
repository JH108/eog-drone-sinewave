import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardRaw from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import DroneMarker from './DroneMarker';

const cardStyles = (theme) => ({
	root: {
		background: theme.palette.primary.main,
	},
	title: {
		color: 'white',
	},
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const cardBodyStyles = (theme) => ({
	root: {
		height: '80vh',
		margin: '15px',
	},
});

const StyledCard = withStyles(cardBodyStyles)(CardRaw);

class Drone extends Component {
	render() {
		const { loading, lastPosition } = this.props;
		console.log(lastPosition);
		if (loading) return <LinearProgress />;
		return (
			<StyledCard>
				<CardHeader title="Drone Map" />
				{lastPosition ? (
					<GoogleMapReact
						bootstrapURLKeys={{
							key: process.env.REACT_APP_MAPS_API_KEY,
						}}
						defaultCenter={{ lat: 29.76045, lng: -95.369781 }}
						zoom={4}
					>
						<DroneMarker
							lat={lastPosition.latitude}
							lng={lastPosition.longitude}
							temp={lastPosition.metric}
						/>
					</GoogleMapReact>
				) : (
					<LinearProgress />
				)}
			</StyledCard>
		);
	}
}

export default Drone;
