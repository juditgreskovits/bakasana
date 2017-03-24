/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { flowerData, linkedData } from './random-data';
import Graph from './graph';

export default class GraphView extends Component {

  constructor(props){
    super(props);

    this.state = {
      data: flowerData()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Graph data={this.state.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
