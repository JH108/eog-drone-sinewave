import React from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardRaw from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

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

const waveStyles = {
	svg: {
		gridLine: {
			stroke: 'lightgray',
			strokeOpacity: 0.7,
			shapeRendering: 'crispEdges',
		},
	},
};

class SineWave extends React.PureComponent {
	componentDidMount() {
		if (!this.props.loading) {
			this.runD3();
		}
	}
	componentDidUpdate() {
		if (!this.props.loading) {
			this.runD3();
		}
	}
	setRef = (el) => {
		this.chart = el;
	};
	runD3 = () => {
		const { temperatures: data, margin, width, height } = this.props;
		const g = select('#g-tag');
		if (g) {
			g.remove();
		}
		const dataGroup = select(this.chart)
			.attr('width', width + margin)
			.attr('height', height + 2 * margin)
			.append('g')
			.attr('id', 'g-tag')
			.attr(
				'transform',
				'translate(' + (margin - 10) + ', ' + (margin + 30) + ')',
			);

		const temps = data.map((point) => point.temp);

		const xScale = scaleTime()
			.domain(d3.extent(data, (d) => d.time))
			.range([0, width]);

		const yScale = scaleLinear()
			.domain([
				Math.min.apply(null, temps) - 5,
				Math.max.apply(null, temps) + 5,
			])
			.range([height, 0]);
		const createdLine = line()
			.x((d) => xScale(d.time))
			.y((d) => yScale(d.temp))
			.curve(d3.curveMonotoneX);

		dataGroup
			.append('path')
			.data([data])
			.attr('fill', 'none')
			.attr('stroke', '#009')
			.attr('stroke-width', '2px')
			.attr('d', createdLine);

		const xAxisGroup = dataGroup
			.append('g')
			.attr('class', 'x-axis-group')
			.attr('transform', 'translate(0, ' + height + ')');
		const xAxis = axisBottom(xScale)
			.tickFormat(d3.timeFormat('%H:%M'))
			.tickSizeOuter(0);
		xAxis(xAxisGroup);
		const yAxisGroup = dataGroup.append('g').attr('class', 'y-axis-group');
		const yAxis = axisLeft(yScale).tickSizeOuter(0);
		yAxis(yAxisGroup);

		const yGridlines = axisLeft(yScale)
			.tickFormat('')
			.tickSize(-width)
			.tickSizeOuter(0);

		const gridY = dataGroup
			.append('g')
			.attr('class', 'gridLine')
			.call(yGridlines);
		gridY.call(yGridlines);

		const xGridlines = axisBottom(xScale)
			.tickFormat('')
			.tickSize(height)
			.tickSizeOuter(0);

		const gridX = dataGroup
			.append('g')
			.attr('class', 'gridLine')
			.call(xGridlines);
		gridX.call(xGridlines);
	};

	render() {
		const { loading, classes } = this.props;
		if (loading) return <LinearProgress />;
		return (
			<StyledCard>
				<CardHeader title="Sine Wave of Drone Heat" />
				<svg
					className={classes.svg}
					ref={this.setRef}
					width={'100%'}
					height={'100%'}
				/>
			</StyledCard>
		);
	}
}

export default withStyles(waveStyles)(SineWave);
