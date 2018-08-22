//using react navigation!
import React , { Component } from 'react';
import { Button, View, Text, Alert, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
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
  //add stuff
  //Adding Items To Array.
 //var json='{"key":0, "note":"placeholder",}';
 if(this.state.comment!=''){
 var test='{"key":'+this.state.nextID+', "note":"'+this.state.comment+'"}';
 //this.state.test='{"key":0, "note":"placeholder"}';
 var obj = JSON.parse(test.toString());

 this.setState((prevState)=>{return {SampleArray:[...prevState.SampleArray, obj],nextID:prevState.nextID+1,comment:''};})

}

 //this.setState({nextID:this.state.nextID+1});
 //this.setState({comment:''});


 //this.state.SampleArray.push(this.state.obj);
 //this.state.nextID++;

  //this.state.SampleArray.push( this.state.comment.toString() );
  // Showing the complete Array on Screen Using Alert.
  //Alert.alert(this.state.obj.note.toString());
  //Alert.alert('Add', `works`);

}
  render() {
    return (
//shows notes + locations

//adding notes

//https://stackoverflow.com/questions/51227070/react-native-having-static-and-dynamic-elements-in-flatlist
      <View style={styles2.container}>
      <FlatList
          data = {this.state.SampleArray}


          renderItem={({item}) => <Text style={styles2.item}>{item.note}</Text>}
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
    /*  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{this.state.Test}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Read data"
          onPress={() => this.setState({

           Test: "Data read"

          })}
        />
        <Button
          title="write data"
          onPress={() => this.setState({

           Test: "Data written to disk"

          })}
        />


      </View>*/

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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
