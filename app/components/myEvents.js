'use strict'
// My Events Template to render views of user created views.

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ScrollView, ListView, TextInput, AlertIOS, AsyncStorage } from 'react-native';

import Main from './Main';

// Test Data Objects
//TODO Get request to database for event data.

let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class myEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objectdataSource: dataSource.cloneWithRows([]),
      highlightedRow: {}
    };

    this.goMap = this.goMap.bind(this);
  }

  componentDidMount(){
    fetch("https://localhost:8000/getMyEvents", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_id: this.props.userId})
    }).then((response) => response.json()).then(responseData => {
      this.setState({
        objectdataSource: dataSource.cloneWithRows(responseData)
      });
    }).done();
  }

  goMap(rowData) {
    console.log("Hello: ", rowData);
    this.props.setEventId(rowData.event_id);
    this.props.navigator.popToTop();
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void)  {
    return (
      <TouchableOpacity style={styles.eventRow} onPress={() => this.goMap(rowData)}>
      <View>
        <Text>{'\n'}{rowData.title}{'\n'}{rowData.time}{'\n'}</Text>
        <View />
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
          backgroundColor: adjacentRowHighlighted ? '#B2B0B2' : '#073AD2',
        }}
      />
    );
   }

   render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{marginTop: 2, alignSelf: 'center', padding: 7}}
          initialListSize={10}
          dataSource={this.state.objectdataSource}
          renderRow={(item) => { return this.renderRow(item) }}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#DFD6CC'
    },
    eventRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      height: 70
    },
    text: {
      flex: 1
    }
});

module.exports =  myEvents;
