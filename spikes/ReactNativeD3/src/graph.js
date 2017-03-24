// TODO
// Style circles and lines and make them prettier
// Consider using colours dependent on 'data' (=index)
// Ensure circle size is stored somewhere and reused
// Ensure sizes (at least svg) is dynamic
// Ensure layout size is stored / uniform
// Ensure layout stays within viewport boundaries

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Dimensions from 'Dimensions';
import * as d3 from 'd3';

import Svg,{
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

export default class Graph extends Component {

  constructor(props) {
    super(props);

    const {
      nodes,
      links
    } = this.props.data;

    this.state = {
      data: {
        nodes: [
          ...nodes
        ],
        links: [
          ...links
        ]
      },
      circleRadius: 4
    };
  }

  componentWillMount() {

    const {
      nodes,
      links
    } = this.state.data;

    const nodeRadius = 10; // needs to be dynamic
    const {
      width,
      height
    } = Dimensions.get('window');

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(links).distance(d => 12))
      // .force('collide', d3.forceCollide(this.state.circleRadius))
      .force('center', d3.forceCenter(width/2, height/2)) // needs to be dynamic
      // .size([200, 200])
      .on('tick', () => {
        // console.log('SIMULATION TICK');
        this.forceUpdate();
      })
      .on('end', () => {
        // console.log('SIMULATION END');
        // this.forceUpdate();
      });

    this.setState({
      simulation: simulation
    });
  }

  render() {

    const {
      data,
      circleRadius
    } = this.state;

    const {
      nodes,
      links
    } = data;

    const {
      width,
      height
    } = Dimensions.get('window');

    const circleFillColour = (node) => {
        return [
          '#9fbfdf',
          '#8cb3d9',
          '#79a6d2',
          '#6699cc',
          '#538cc6',
          '#4080bf',
          '#3973ac',
          '#336699',
          '#2d5986',
          '#264d73'
        ].reduce((acc, colour, index) => node.index%index === 0 ? colour : acc);
    }

    const circles = nodes.map((node, index) => (
      <Circle
        fill={circleFillColour(node)}
        stroke='#060d13'
        key={index}
        cx={node.x}
        cy={node.y}
        r={circleRadius}
      />
    ));

    const lines = links.map((link, index) => (
      <Line
        stroke='#132639'
        strokeWidth={1}
        key={index}
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
      />
    ));

    return (
      <Svg
        width={width}
        height={height}
      >
        {lines}
        {circles}
      </Svg>
    );
  }
}

Graph.propTypes = {
  data: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
