'use strict'

import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Dimensions, Text, AlertIOS, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';

import createEvent from './createEvent';

const { width, height } = Dimensions.get('window')

var count = 0;
var regionText = {
  latitude: '0',
  longitude: '0'
};

class createRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: { latitude: 40.8534229, longitude: -73.9793236 },
      routeCoordinates: [],
      title: '',
      text: '',
      keywords: [],
      pins: [{}]
    }
    this.createNewPin = this.createNewPin.bind(this);
    this.checkPinCoordinates = this.checkPinCoordinates.bind(this);
    this.changeCoordinatesAfterDrop = this.changeCoordinatesAfterDrop.bind(this);
    this._onPressButtonPOST = this._onPressButtonPOST.bind(this);
  }

  saveData() {
    // TODO: API call to POST 'route title' and 'keywords array' to database
    console.log('Route Title: ' + this.state.title + ' Key Words Array: ' + this.state.keyWords);
  }

  onRegionChangeComplete(e) {
    regionText.latitude = e.latitude
    regionText.longitude = e.longitude
  }

  createNewPin() {
     var pin = { latlng: {latitude: regionText.latitude, longitude: regionText.longitude }, key: count};
     this.state.pins[0][pin.key] = pin;
     count++
    // console.log('TEST', this.state.pins);
     this.setState({})
     console.log('id', count);
  }
  changeCoordinatesAfterDrop(e, key) {
     this.state.pins[0][key]['latlng'] = e.nativeEvent.coordinate
     this.setState({});
  }
  checkPinCoordinates() {
     console.log('PIN', this.state.pins[0]['0'], this.state.pins[0]['1']);
  }

  _onPressButtonPOST(start, end){
    var startCoord = start.latlng.latitude + ',' + start.latlng.longitude;
    var endCoord = end.latlng.latitude + ',' + end.latlng.longitude;
    console.log('send to back', startCoord, endCoord);
     fetch("https://wegoios.herokuapp.com/getRouteFromGoogle", {method: "POST", headers: {'Content-Type': 'application/json'} ,body: JSON.stringify({start: startCoord, end: endCoord})})
     .then((response) => response.json())
     .then((responseData) => {
       console.log('DATA FROM SERVER', responseData)
       this.setState({routeCoordinates: responseData});
     })
     .done();
 }

  createEventView() {
    this.props.navigator.push({
      component: createEvent,
      title: "Create Event",
      passProps: {
        title: 'Night On The Town',
        keyWords: ['NYC', 'Downtown', 'TriBeCa', 'Midtown'],
        start: {},
        end: {},
        routeObj: {}
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView
            style={styles.map}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
          <TextInput
            style={styles.inputText}
            autoFocus = {true}
            placeholder = "Enter route title"
            placeholderTextColor='#CDCDC9'
            // onChangeText={(text) => this.setState({title: text})}
            onSubmitEditing={(event) => {
              this.refs.SecondInput.focus();
            }}
          />
          <TextInput
            ref='SecondInput'
            style={styles.inputOne}
            placeholder="keywords"
            placeholderTextColor='#CDCDC9'
          />
            {Object.keys(this.state.pins[0]).map(id => (
              <MapView.Marker
                key={this.state.pins[0][id].key}
                coordinate={this.state.pins[0][id].latlng}
                onDragEnd={(e) => this.changeCoordinatesAfterDrop(e, this.state.pins[0][id].key)}
                draggable
              />
            ))}
            <MapView.Polyline
             coordinates={this.state.routeCoordinates}
             strokeColor="rgba(0,0,200,0.5)"
             strokeWidth={3}
             lineDashPattern={[5, 2, 3, 2]}
           />
         </MapView>
         <View>
         <TouchableOpacity
           style={styles.buttonPin}
           onPress={() => this.createNewPin()}
          >
          <Text>PIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCheck}
          onPress={() => this._onPressButtonPOST(this.state.pins[0]['0'], this.state.pins[0]['1'])}
         >
        <Text>Check</Text>
          </TouchableOpacity>
          <TouchableHighlight style={styles.createRouteBtn} onPress={() => this.createEventView()}>
            <Text>Create Route</Text>
          </TouchableHighlight>
        </View>
      </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 3,
    width: width
  },
  inputText: {
    height: 40,
    width: width,
    padding: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 80
  },
  inputOne: {
    height: 40,
    width: width,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  buttonPin: {
    bottom: 30,
    right: 120,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  buttonCheck: {
    bottom:30,
    right: 40,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  createRouteBtn: {
    bottom: 30,
    position: 'absolute',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20
  }
});

module.exports =  createRoute;
