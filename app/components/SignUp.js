'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput, AlertIOS, AsyncStorage } from 'react-native';
import logo from '../icons/weGoToo_logo.png'
import Icon from 'react-native-vector-icons/FontAwesome';

class SignUp extends Component {
	constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  }

  signUp(){
		console.log('name: '+ this.state.name + '\nemail: '+ this.state.email + '\nusername: '+ this.state.username + '\npassword: '+ this.state.password);


				//fetch("https://wegotoo.herokuapp.com/signup", {

				fetch("http://localhost:8000/signup", {
				method: 'POST',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: this.state.name,
					email: this.state.email,
					username: this.state.username,
					password:  this.state.password,
				})
			}).then((response) => response.json()).then((responseData) => {
			}).then((response) => response.json())
				.then((responseData) => {
					console.log('DATA FROM SERVER', responseData)
					//update Asynch storage
					var id = '' + responseData.userId;
					AsyncStorage.setItem("userId", id);
					AsyncStorage.setItem('username',this.state.username)
					this.navToMain(responseData.userId)
			 }).done();
				//	AsyncStorage.setItem('username',responseData.username)
					this.navToMain()
			 })
			 .done();
  }

	navToMain(id){
		//console.log('Username: ' + this.state.username + ' ID: ' + id);
		this.props.navigator.resetTo({
			navigationBarHidden: true,
			component: Main,
			title: "Main",
			passProps: {
        username: this.state.username,
				userId: id
      }
		});
	}

  render() {
		return (
      <View style={styles.container}>
				<Image source={logo} style={styles.logo}/>
        <TextInput
          style={styles.inputText}
          returnKeyType={"next"}
          autoFocus={true}
          placeholder="Name"
          placeholderTextColor="silver"
          onChangeText={(text) => this.setState({name: text})}
          onSubmitEditing={(event) => {
            this.refs.SecondInput.focus();
          }}
        />
        <TextInput
          ref='SecondInput'
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="silver"
          onChangeText={(text) => this.setState({email: text})}
          onSubmitEditing={(event) => {
            this.refs.ThirdInput.focus();
          }}
        />
				<TextInput
          ref='ThirdInput'
          style={styles.inputText}
					placeholder="Username"
          placeholderTextColor="silver"
          onChangeText={(text) => this.setState({username: text})}
          onSubmitEditing={(event) => {
            this.refs.FourthInput.focus();
          }}
        />
        <TextInput
          ref='FourthInput'
          style={styles.inputText}
					placeholder="Password"
          placeholderTextColor="silver"
          password={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight onPress={() => this.signUp()} style={styles.button}>
					<Text><Icon name="cloud-upload" size={25} color="#3498db"/></Text>
        </TouchableHighlight>
			</View>
			)
	}
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
    text: {
      color: 'blue',
      backgroundColor: '#3498db',
      fontSize: 30,
      margin: 80
    },
    inputText: {
      height: 35,
      color: '#3498db',
			borderColor: "#3498db",
			fontSize: 15,
			paddingLeft: 95,
			borderBottomColor: 'red'
    },
    textHeader: {
      fontSize: 30,
      color: '#3498db',
      justifyContent: 'flex-start'
    },
    button: {
				width:50,
				height:50,
				marginLeft:165,
				marginTop:10,
				position: 'absolute',
				backgroundColor: '#fff',
				borderColor: "#3498db",
				borderWidth: 1,
				paddingHorizontal: 11,
				paddingVertical: 11,
				borderRadius: 50,
        flexDirection: 'row',
    },
		logo: {
			marginTop: 150,
			height: 160,
			width: 190,
			flexDirection: 'row'
		}
	});

module.exports =  SignUp;
