//using react navigation!
import React , { Component } from 'react';
import { Button, View, Text, Alert, TextInput, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

class LoginScreen extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
      };
    }

    onLogin() {
    const { username, password } = this.state;

    //Alert.alert('Credentials', `${username} + ${password}`);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (

      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})



class HomeScreen extends React.Component {

  constructor(){

      super();

      this.state = {

          comment: '',
          nextID: 7,
          SampleArray: [
          {key: 1, note: 'James'},
          {key: 2, note: 'Joel'},
          {key: 3, note: 'John'},
          {key: 4, note: 'Jillian'},
          {key: 5, note: 'Jimmy'},
          {key: 6, note: 'Julie'}],



      };

  }

  onAdd() {

  //Adding Items To Array.
  //quick tapping of add might cause bugs...
 if(this.state.comment!=''){
 var test='{"key":'+this.state.nextID+', "note":"'+this.state.comment+'"}';
 var obj = JSON.parse(test.toString());

 this.setState((prevState)=>{return {SampleArray:[...prevState.SampleArray, obj],nextID:prevState.nextID+1,comment:''};})
 //Key is unique, checked with code below.
 //Alert.alert(obj.key.toString());
}

}

actionOnRow(item) {
  //works! item is JSON object.
   //console.log('Selected Item :',JSON.stringify(item));

   //change screen and pass data

   this.props.navigation.navigate('Details',{comment: item.note});

}

  render() {
    return (
//shows notes + locations

//adding notes

//https://stackoverflow.com/questions/51227070/react-native-having-static-and-dynamic-elements-in-flatlist
      <View style={styles2.container}>
      <FlatList
          data = {this.state.SampleArray}


          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>

              <View>
                <Text style={styles2.item}>{item.note}</Text>
              </View>

            </TouchableWithoutFeedback>
          )}

          keyExtractor={ (item, index) => index.toString() }
        />


      <TextInput
        value={this.state.comment}
        onChangeText={(comment) => this.setState({ comment })}
        placeholder={'Comment'}
        style={styles.input}
      />

      <Button
        title={'Add'}
        style={styles.input}
        onPress={this.onAdd.bind(this)}
      />

      </View>

    );
  }
}

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

class DetailsScreen extends React.Component {

  render() {

    const { navigation } = this.props;
    const comment = navigation.getParam('comment', 'error: no comment found');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{comment}</Text>

        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Login',
  }
);
