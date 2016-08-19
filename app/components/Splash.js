'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, AlertIOS, AsyncStorage } from 'react-native';
import SignUp from './SignUp'
import Main from './Main'
import About from './About'
import icon from '../icons/weGoToo_logo.png'

class Splash extends Component {
	constructor(props) {
    super(props)
    this.state = {
    }
  }

	componentDidMount(){
		// AsyncStorage.setItem("username", '');
  	AsyncStorage.multiGet(["username", "userId"]).then((data) => {
			// console.log("SPLASH:",data)
      if(data[0][1] === null){
        // new user
				this.props.navigator.push({
					navigationBarHidden: true,
					component: SignUp,
					title: ""
				});
      } else {
				var that = this
				setTimeout(function() {
				that.props.navigator.resetTo({
					navigationBarHidden: true,
					component: Main,
					title: "Main",
					passProps: {
		        userId: +data[1][1],
						username: data[0][1]
		      }
				})
				// do something in 0 ms
			}, 500)
    	}
  	});
	}

  render() {
		return (
      <View style={styles.container}>
		 	<Image source={icon} style={styles.image}/>
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
		image: {
			height:200,
			width:230
		}
});

module.exports =  Splash;
