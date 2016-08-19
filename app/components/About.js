'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, AlertIOS, AsyncStorage } from 'react-native';
import Logo from '../assets/NYC.png'

class About extends Component {
	constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
		return (
      <View style={styles.container}>
		 	<Image source={Logo} style={styles.image}/>
				<Text style={styles.textHeader}>
					The Development Team
				</Text>

			</View>
			)
	}
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    text: {
      color: 'blue',
      backgroundColor: 'lightblue',
      fontSize: 30,
      margin: 80
    },
		image: {
			height:30,
			width:30
		},
    inputText: {
      height: 35,
      color: '#3498db',
			borderColor: "#3498db",
			fontSize: 15,
			paddingLeft: 95,
			borderBottomColor: 'red'
    }
});

module.exports =  About;
