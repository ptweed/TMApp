import { createStackNavigator } from 'react-navigation-stack'
import Splash from '../screens/Splash'
import AuthScreen from '../screens/AuthScreen'

const AuthNavigation = createStackNavigator(
  {
    AuthScreen: { screen: AuthScreen },
    Splash: { screen: Splash},
  },
  {
    initialRouteName: 'AuthScreen',
    headerMode: 'none',
  }
)

export default AuthNavigation
