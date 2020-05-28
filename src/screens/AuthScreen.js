import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login'
import Forgot from './Forgot'
import SignUp from './Signup'
import LandingLogo from '../components/LandingLogo'
import ConfirmSignUp from './ConfirmSignUp'
import ForgotConfirm from './ForgotConfirm'
import OfflineNotifier from '../components/OfflineNotifier'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})

const Stack = createStackNavigator();

export default function AuthScreen(props) {
  const [localParentNav, setLocalParentNav] = React.useState(props.navigation)
  const [isConnected, setIsConnected] = React.useState(true)

  React.useEffect(() => {
    setLocalParentNav(props.navigation)
    console.log('AuthScreen loaded')
  });

  const offlineStateChanged = async isConnected => {
    setIsConnected(isConnected)
  }

  return (
  <SafeAreaView style={styles.container}>
    <OfflineNotifier offlineStateChanged={offlineStateChanged} isLogin={true} />
    <LandingLogo/>
    <NavigationContainer >
        <Stack.Navigator initialRouteName="Login" headerMode="none" >
        <Stack.Screen name="Login" >
          {props => <Login {...props} parentNav={localParentNav} isConnected={isConnected} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" >
          {props => <SignUp {...props} isConnected={isConnected} />}
        </Stack.Screen>
        <Stack.Screen name="Forgot" >
          {props => <Forgot {...props} isConnected={isConnected} />}
        </Stack.Screen>
        <Stack.Screen name="ConfirmSignUp" >
          {props => <ConfirmSignUp {...props} parentNav={localParentNav} isConnected={isConnected} />}
        </Stack.Screen>
        <Stack.Screen name="ForgotConfirm" >
          {props => <ForgotConfirm {...props} parentNav={localParentNav} isConnected={isConnected} />}
        </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);
}
