import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {Header} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(){
    super();
    this.state={
      text: "",
      isSearchPressed: false,
      word: "Loading...",
      lexicalCategory: '',
      examples: [],
      definition: ''
    }
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json";
    return fetch(url).then((data)=>{
      if(data.status == 200){
        return data.json();
      }
      else{
        return null;
      }
    }).then((response)=>{
      var responseObject = response;

      if(responseObject) {
        var wordData = responseObject.definitions[0];

        var definition = wordData.description;

        var lexicalCategory = wordData.wordtype;

        this.setState({
          "text": this.state.text,
          "definition": definition,
          "lexicalCategory": lexicalCategory
        })

      }
      else {
        this.setState({
          "text": this.state.text,
          "definition": "Not Found"
        })
      }
    })
  }

  render() {
    return(
      <View> 
         <Header backgroundColor = 'orange'
        centerComponent = {{text: 'Type and Find',style:{color: 'white',fontSize: 20}}}/> 

         <TextInput 
          style = {styles.textInput}
          placeholder="                                                   Word"
          autoFocus={false}
          autoCapitalize={false}
          autoCorrect={true}
          keyboardType="default"
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(text) => this.setState({
            text: text,
            isSearchPressed: false,
            word: "Loading...",
            lexicalCategory: '',
            examples: [],
            definition: ''
          })}
          value={this.state.text}/>

          <View>
            <TouchableOpacity style={styles.goButton}
            onPress={()=>{
              this.setState({isSearchPressed: true});
              this.getWord(this.state.text);
            }}>
            <Text style={{color: 'white',textAlign: 'center'}}> Define </Text> 
            </TouchableOpacity> 
          </View>

          <View style={styles.styleContainer}>
            <Text style={styles.styleText}> Word:{""} </Text> 
            <Text style={{fontSize:18}}> {this.state.text} </Text>
          </View>

          <View style={styles.styleContainer}>
            <Text style={styles.styleText}> Type: {""} </Text> 
            <Text style={{fontSize:18}}> {this.state.lexicalCategory} </Text>
          </View>

          <View style={styles.styleContainer}>
            <Text style={styles.styleText}> Definition: {""} </Text> 
            <Text style={{fontSize:18}}> {this.state.definition} </Text>
          </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 40,
    marginLeft: 23,
    height: 30,
    width: 325,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 10
  },
  goButton: {
    backgroundColor: 'blue',
    width: 300,
    height: 25,
    marginLeft: 35,
    marginTop: 30,
    borderRadius: 15
  },
  styleContainer: {
    marginLeft: 20,
    marginTop: 20,
  },
  styleText: {
    fontSize: 20
  }
});
