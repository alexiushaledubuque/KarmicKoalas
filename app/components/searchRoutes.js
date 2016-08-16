import React, { Component } from 'react'
import { View, StyleSheet, Image, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import createEvent from './createEvent';
import icon from '../icons/noun_14294.png'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SearchRoutes extends Component {
   constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      dataSource: ds.cloneWithRows([])
    };
  }

  handleItemClick(item) {
    console.log("Route: ", item);
    this.props.navigator.push({
      component: createEvent,
      title: "Create Event"
    });
  }

  getRoutes(){
	//	fetch("https://wegotoo.herokuapp.com/searchKeywords", {
    fetch("https://wegotoo.herokuapp.com/searchKeywords", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({keywords: this.state.search.trim().split(',')})
 	})
  .then((response) => response.json()).then((responseData) => {
  		//console.log('DATA FROM SERVER', responseData);
      this.setState({
        dataSource: ds.cloneWithRows(responseData)
      });
	 }).catch((error) => {
     console.error(error);
   })
	 .done();
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.handleItemClick(rowData)}>
      <View>
       <Image style={styles.image} source={icon}/>
       <Text style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10}}>{rowData.title}{'\n'}{rowData.start_address}{'\n'}{rowData.end_address}</Text>
      </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#E0DFDF' : '#073AD2',
        }}
      />
    );
   }

  render() {
    return (
      <View style={styles.navBar}>
        <TextInput
          style={{height: 50}}
          autoFocus = {true}
          multiline = {true}
          numberOfLines = {8}
          borderWidth={2}
          fontSize={15}
          padding={10}
          value={this.state.search}
          placeholder="Enter keywords: ex. NYC,Atlanta,City-Of-Love"
          onChangeText={(text) => this.setState({search: text})}/>
        <View style={{paddingTop: 2}}>
        <TouchableHighlight onPress={() => this.getRoutes()} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <View style={styles.container}>
          <ListView
            style={{marginTop: 2, alignSelf: 'center', padding: 7}}
            initialListSize={1}
            dataSource={this.state.dataSource}
            renderRow={(route) => { return this.renderRow(route) }}
            renderSeparator={this.renderSeparator}
            enableEmptySections={true}/>
          </View>
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
    backgroundColor: '#E0DFDF'
  },
  navBar: {
    height: 50,
    top: 15,
    paddingTop: 50
  },
  routeRow: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: 'skyblue',
    paddingHorizontal: 30,
    paddingVertical: 12,
    padding: 5,
    marginTop: 4
  },
  image: {
    height: 20,
    width: 20
  }
});

module.exports =  SearchRoutes;
