import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import * as actions from '../actions';

import {jwtHandler} from '../actions';

function SignUp({navigation}) {
  return (
    <Button
      title="Go somewhere"
      onPress={() => {
        // Navigate using the `navigation` prop that you received
        navigation.navigate('Users');
      }}
    />
  );
}

export default SignUp;
