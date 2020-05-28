import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import TabsScreen from '../screens/TabsScreen'
import TaskCreate from '../screens/TaskCreate'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class AppNavigation extends React.Component {

    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {tasks: [] };
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            console.log('AppNavigation loaded')
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
  
    render() {
      let {tasks} = this.state

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="TabsScreen" headerMode="none" mode="modal" >
            <Stack.Screen name="TabsScreen" >
                {props => <TabsScreen {...props} 
                mainNav={this.props.navigation} />}
            </Stack.Screen>
            <Stack.Screen name="TaskCreate" >
                {props => <TaskCreate {...props} />}
            </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
      )
    }
}
