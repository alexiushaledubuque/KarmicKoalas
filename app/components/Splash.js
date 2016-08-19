'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, Image, AlertIOS, AsyncStorage } from 'react-native';
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
    	AsyncStorage.multiGet(["username", "userId"]).then((data) => {
      if(data[0][1] === null){
        //new user
				this.props.navigator.push({
					navigationBarHidden: true,
					component: SignUp,
					title: "SignUp"
				});
      } else {
				var that = this
				setTimeout(function() {
        //existing user
				that.props.navigator.resetTo({
					navigationBarHidden: true,
					component: Main,
					title: "Main",
					passProps: {
		        userId: data[1][1],
						username: data[0][1]
		      }
				})
				// do something in 0 ms
			}, 3500)
    	}
  	});
	}

  render() {
		return (
      <View style={styles.container}>
		 	<Image source={icon} style={styles.image}/>
				<Text style={styles.textHeader}>
					WeGoToo>>>>>
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
		image: {
			height:200,
			width:230
		},
    text: {
      fontSize: 30,
      margin: 80
    }
});

module.exports =  Splash;
