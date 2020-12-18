import React, {Component} from 'react';
import {Text, Alert, Button, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import * as actions from '../actions';

import {jwtHandler} from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      jwt: '',
    };
  }

  go = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      alert('valid');
    } else {
      alert();
    }
  };

  onLogin() {
    const {email, password} = this.state;

    var details = {
      email: email,
      password: password,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://users-manager-server.herokuapp.com/api/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          jwt: data.token,
        });
        this.props.jwtHandler(data.token);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          label="Email"
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          label="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          buttonStyle={{width: 150}}
          containerStyle={{margin: 5}}
          disabledStyle={{
            borderWidth: 2,
            borderColor: '#00F',
          }}
          disabledTitleStyle={{color: '#00F'}}
          linearGradientProps={null}
          iconContainerStyle={{background: '#000'}}
          loadingProps={{animating: true}}
          loadingStyle={{}}
          onPress={this.onLogin.bind(this)}
          title="Login"
          titleStyle={{marginHorizontal: 5}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt,
  };
};

export default connect(mapStateToProps, {jwtHandler})(SignIn);
