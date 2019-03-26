import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry } from 'react-native'

class FlexboxExamples extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box]}/>
        {/* <View style={[styles.box, {flex: 2}, {alignSelf: 'flex-end'}]}/> */}
        <View style={[styles.box]}/>
        {/* <View style={styles.box}/> */}
        {/* <View style={styles.box}/> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1, // porcentagem do item
    //justifyContent: 'flex-start'
    // justifyContent: 'center',
    // justifyContent: 'flex-end'
    // justifyContent: 'space-between'
    // flexDirection: 'row', // column é o default (Main Axis)
    // justifyContent: 'space-around', 
    // alignItems: 'flex-start' // mexe com o Cross Axis
    // alignItems: 'center',
    // alignItems: 'flex-end'
    // alignItems: 'stretch'
    // alignSelf: 'flex-end' // alinhamento próprio, sem levar em consideração os outros filhos
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  box: {
    height: 50, // comentar para usar stretch em alignItems
    width: 50, // comentar para usar stretch em alignItems
    backgroundColor: '#e76e63',
    margin: 10,
  }
})

export default FlexboxExamples;