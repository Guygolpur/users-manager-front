import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SignIn from './SignIn';
import Navigation from './Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {jwtHandler} from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class IsLogin extends Component {
  UNSAFE_componentWillMount() {
    this.props.jwtHandler();
  }

  isLogin() {
    return (
      <NavigationContainer>
        {!this.props.jwt ? <SignIn /> : <Navigation />}
      </NavigationContainer>
    );
  }

  render() {
    return <View style={styles.container}>{this.isLogin()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.jwt,
  };
};

export default connect(mapStateToProps, {jwtHandler})(IsLogin);
