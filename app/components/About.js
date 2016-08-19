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
				<Text style={styles.textHeader}></Text>
				<Text style={styles.description}>
					We Go Too is a social map app. Users create and share routes,
					create events and share the with friends via GPS and Chat”  Some applications
					include tourism, school field trips, bike rides, shopping together or a
					great game of tag.  We bring people together!

					Tech Stack:  React Native, Mysql, Express, Node
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
    description: {
			margin: 15,
      height: 400,
      color: '#3498db',
			borderWidth: 2,
			padding: 10,
			borderColor: "#3498db",
			fontSize: 15,
			borderBottomColor: 'red'
    }
});

module.exports =  About;
