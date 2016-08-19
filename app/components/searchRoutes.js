import React, { Component } from 'react'
import {Dimensions, View, StyleSheet, Image, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight, TouchableOpacity, AlertIOS } from 'react-native';

import createEvent from './createEvent';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const { width, height } = Dimensions.get('window')

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
      title: "Create Event",
      passProps: {
        routeID: item.id,
        userId: this.props.userId,
        setEventId: this.props.setEventId
      }
    });
  }

  checkBeforeRequest() {
    if (!this.state.search) {
        AlertIOS.alert("Keywords are required!");
        setTimeout(function() {
          this.refs.textInput.focus();
        }.bind(this), 0);
    } else {
      this.getRoutes();
    }
  }

  getRoutes(){
     fetch("http:localhost:8000/searchKeywords", {

    //fetch("https://wegotoo.herokuapp.com/searchKeywords", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({keywords: this.state.search.trim().split(',')})
    })
    .then((response) => response.json()).then((responseData) => {
        console.log('DATA FROM SERVER', responseData);

        if (responseData.message){
          console.log(responseData.message)
          AlertIOS.alert("We don't have any routes for those keywords");
        } else {
          this.setState({
            dataSource: ds.cloneWithRows(responseData)
          })
      }
     }).catch((error) => {
       console.error(error);
     })
     .done();
     this.setState({search: ''});
    }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.handleItemClick(rowData)}>
      <View style={styles.box}>
        <View style={styles.img}>
          <Text><FIcon name="globe" size={25} color="#3498db"/></Text>
        </View>
        <View style={styles.text}>
           <View>
               <Text style={styles.titleRow}>{rowData.title}</Text>
           </View>
           <View>
               <Text style={styles.start}>Start: {rowData.start_address}</Text>
           </View>
           <View>
               <Text style={styles.start}>End: {rowData.end_address}</Text>
           </View>
        </View>
      <View>
        <View />
    </View></View>
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
        <View style={styles.search}>
          <TextInput
            ref='textInput'
            style={styles.inputText}
            autoFocus = {true}
            value={this.state.search}
            placeholder="Enter keywords: ex. NYC,Atlanta,City-Of-Love"
            onKeyPress={this.handleKeyDown}
            onChangeText={(text) => this.setState({search: text})}/>
            <TouchableHighlight style={styles.sendBtn} onPress={() => this.checkBeforeRequest()}>
                <Text><FIcon name="search" size={20} color="#3498db" /></Text>
            </TouchableHighlight>
          </View>

            <ListView style={styles.eventRow}
              style={{marginTop: 15, alignSelf: 'center'}}
              initialListSize={10}
              dataSource={this.state.dataSource}
              renderRow={(item) => { return this.renderRow(item) }}
              enableEmptySections={true}
              contentInset={{bottom:10}}/>
      </View>

      );
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#eee'
  },
  search: {
    zIndex:5,
    flexDirection: "row",
    backgroundColor:'#ccc',
    width: width,
    height: 60,
    borderColor: "#3498db",
    borderWidth: 1
  },
  inputText: {
    top:65,
    height: 40,
    width: width-35,
    marginLeft:0,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  sendBtn: {
    flex: 0.25,
    top: 65,
    marginRight: 30,
    width:40,
    height:40,
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  list: {
    flexDirection: "row",
    width: width,
    top: 40,
    height:height-40
  },
  eventRow: {
    backgroundColor: '#fff',
    flexDirection: "row",
    width: width-20,
    height: 90,
    borderColor:'#3498db',
    borderWidth:1,
    padding:5,
    overflow: 'hidden',
  },
  box: {
    flexDirection: "row",
    borderColor:'#3498db',
    borderWidth:1,
    height: 70,
    width: width-20,
    marginRight:5,
    marginLeft:5,
    margin:5
  },
  text: {
    backgroundColor: '#fff',
    width: width-84,
    paddingRight:20,
    height: 67,
    overflow: 'hidden',
  },
  img: {
    paddingLeft:15,
    paddingRight:25,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  titleRow: {
    marginTop:5,
    marginBottom:5,
    fontWeight:'bold',
    color:'#000',
    textAlign:'left',
  },
  start: {
    color:'#ccc',
    fontSize:11
  },
  time: {
    color:'#000',
    fontSize:11,
    textAlign:'left',
    paddingTop:10,
  },

  image: {
    height: 20,
    width: 20
  }
});

module.exports =  SearchRoutes;
